import axios from "axios";

const instance = axios.create({
  baseURL: "api/", // 'backend' is the Docker service name
});

export default instance;
