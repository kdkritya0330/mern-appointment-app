import axios from "axios";

const instance = axios.create({
  baseURL: "", // 'backend' is the Docker service name
});

export default instance;
