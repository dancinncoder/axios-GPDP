// import axios from "axios";
import { useEffect, useState } from "react";
import api from './axios/api';

function App() {
  const [todos, setTodos] = useState(null);
  const [inputValue, setInputValue] = useState({
    title: '',
  });
  const [editedId, setEditedId] = useState('');
  const [editedContent, setEditedContent] = useState('');

  // 조회 함수
  const fetchTodos = async() => {
    const {data} = await api.get(`/todos`);
    console.log('response', data);
    setTodos(data);
  }

  // 추가 함수
  const onSubmitHandler = async() => {
    await api.post(`/todos`, inputValue);
    // 컴포넌트에도 랜더링되게 하기 (state 도 바꾸기)
    // setTodos([...todos, inputValue ]);
    fetchTodos();
  }


  // 삭제 함수
  const onDeleteHandler = async(id) => {
    await api.delete(`/todos/${id}`);
    setTodos(todos.filter((item)=> item.id !== id));
  }

  useEffect (() => {
    //db로부터 값을 가져오기
    fetchTodos();
  }, [])

  // 수정함수
  const onUpdatedHandler = async() => {
    await api.patch(`/todos/${editedId}`,{
      title: editedContent,
    })
    setTodos(todos.map((item)=>{
      if(item.id == editedId){
        return {...item, title: editedContent}
      } else {
        return item;
      }
      })
    );
  }

  return (
    <div>
      {/* 수정 영역 */}
      <form>
        <input value={editedId} type="text" placeholder="수정할 아이디" onChange={(e) => {
          setEditedId(e.target.value);
        }}/>
        <input value={editedContent} type="text" placeholder="수정할 내용" onChange={(e)=> {
          setEditedContent(e.target.value);
        }}/>
        <button onClick={()=> onUpdatedHandler(editedId, editedContent)}>수정반영하기</button>
      </form>
      {/* input 영역 */}
      <div>
        <form onSubmit={(e)=>{
          e.preventDefault();
          // 버튼 클릭 시, input에 들어있는 값(state)를 이용하여 DB에 저장(post 요청)
          onSubmitHandler();
          setInputValue("");
        }}>
          <input value={inputValue.title} onChange={(ev)=>{
            setInputValue({ title: ev.target.value});
          }} type="text" />
          <button type="submit">추가</button>
        </form>
      </div>
      {/* 데이터 영역 */}
      <div>
        {todos?.map((item)=> {
          return(
            <div key={item.id}>
              {item.id} : {item.title} &nbsp; <button onClick={()=> onDeleteHandler(item.id)}>삭제</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
