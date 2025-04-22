import axios from "../src/axiosInstance";

const instance = axios.create({
  baseURL: "http://13.127.152.132:8082", // 🔁 Replace with your actual EC2 public IP
  withCredentials: true, // optional depending on your auth
});

export default instance;
