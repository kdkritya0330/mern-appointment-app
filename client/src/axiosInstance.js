import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.127.137.215:8082", // 'backend' is the Docker service name
});

export default instance;
