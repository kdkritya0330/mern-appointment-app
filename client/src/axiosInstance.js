import axios from "../axiosInstance";

const instance = axios.create({
  baseURL: "http://<YOUR-EC2-PUBLIC-IP>:8082", // 🔁 Replace with your actual EC2 public IP
  withCredentials: true, // optional depending on your auth
});

export default instance;
