import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "../../axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../../redux/features/alertSlice";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/v1/doctor/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };

  const getDoctorInfo = async () => {
    try {
      const res = await axios.post(
        "//v1/doctor/getDoctorInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorInfo();
  }, []);

  return (
    <Layout>
      <div className="container py-4 animate__animated animate__fadeIn">
        <h2 className="text-center text-info mb-4">Manage Doctor Profile</h2>
        {doctor && (
          <Form
            layout="vertical"
            onFinish={handleFinish}
            className="bg-white p-4 rounded shadow-lg"
            initialValues={{
              ...doctor,
              timings: [
                moment(doctor.timings[0], "HH:mm"),
                moment(doctor.timings[1], "HH:mm"),
              ],
            }}
          >
            <h4 className="text-primary">Personal Details</h4>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}> <Input placeholder="Your First Name" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}> <Input placeholder="Your Last Name" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Phone No" name="phone" rules={[{ required: true }]}> <Input placeholder="Your Contact No" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Email" name="email" rules={[{ required: true }]}> <Input type="email" placeholder="Your Email" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Website" name="website"> <Input placeholder="Your Website" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Address" name="address" rules={[{ required: true }]}> <Input placeholder="Your Clinic Address" /></Form.Item>
              </Col>
            </Row>

            <h4 className="text-primary mt-4">Professional Details</h4>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Specialization" name="specialization" rules={[{ required: true }]}> <Input placeholder="Your Specialization" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Experience" name="experience" rules={[{ required: true }]}> <Input placeholder="Your Experience" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Fees Per Consultation" name="feesPerCunsaltation" rules={[{ required: true }]}> <Input placeholder="Fees in ₹" /></Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8} className="mb-3">
                <Form.Item label="Timings" name="timings" rules={[{ required: true }]}> <TimePicker.RangePicker format="HH:mm" className="w-100" /></Form.Item>
              </Col>
              <Col xs={24} className="text-center mt-3">
                <button type="submit" className="btn btn-info px-5 py-2 fw-bold">
                  Update Profile
                </button>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </Layout>
  );
};

export default Profile;
