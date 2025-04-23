import axios from "axios"; // ✅ import from axios package, not your own file

const instance = axios.create({
  baseURL: "http://13.127.137.215:8082", // your EC2 public IP
  // baseURL: "http://localhost:8082", // your EC2 public IP//
  withCredentials: true, // optional depending on your auth
});

export default instance;
