import axios from "axios";

const instance = axios.create({
  baseURL: "http://15.207.108.158:8082/", // 'backend' is the Docker service name
});

export default instance;
