import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import axios from "../axiosInstance"; // using custom Axios with baseURL: '/api'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      // 💥 Axios will call /api/v1/user/register, routed by Nginx
      const res = await axios.post("/v1/user/register", values);

      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Registered Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onfinishHandler} className="register-form">
        <h3>Register Form</h3>
        <Form.Item label="Name" name="name">
          <Input type="text" required />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <Link to="/login">Already a user? Login here</Link>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </Form>
    </div>
  );
};

export default Register;
