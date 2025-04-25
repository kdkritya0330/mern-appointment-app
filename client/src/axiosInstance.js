import axios from "axios";

const instance = axios.create({
  baseURL: "http://43.204.29.197:8082/", // 'backend' is the Docker service name
});

export default instance;
