import axios from "axios";

// 인자로 configuration 객체가 들어간다.
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

export default instance;
