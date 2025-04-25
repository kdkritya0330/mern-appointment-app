import axios from "axios";

const instance = axios.create({
  baseURL: "http://api/", // 'backend' is the Docker service name
});

export default instance;
