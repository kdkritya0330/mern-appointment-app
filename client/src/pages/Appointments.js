import React, { useState, useEffect } from "react";
import axios from "../axiosInstance";
import Layout from "./../components/Layout";
import moment from "moment";
import { Table, Tag } from "antd";
import { motion } from "framer-motion"; // For smooth animation

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "Appointment ID",
      dataIndex: "_id",
      key: "_id",
      render: (text) => <Tag color="geekblue">{text.slice(-5)}</Tag>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      key: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} &nbsp;
          {moment(record.time).format("hh:mm A")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color = "blue";
        if (status === "pending") color = "volcano";
        else if (status === "approved") color = "green";
        else if (status === "cancelled") color = "red";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container py-5"
      >
        <h1 className="text-center fw-bold text-primary mb-4">
          Your Appointment History
        </h1>
        <Table
          columns={columns}
          dataSource={appointments}
          pagination={{ pageSize: 5 }}
          bordered
          className="shadow rounded"
        />

        {/* Additional Content */}
        <div className="text-center mt-5">
          <h3 className="text-success fw-semibold">Need to Reschedule?</h3>
          <p className="text-muted">
            Contact our support team or your doctor directly from your dashboard. Your health is our priority.
          </p>
          <p className="text-muted">
            You can always view your upcoming and past appointments here. We ensure transparency and simplicity in your healthcare journey.
          </p>
        </div>

        {/* Quote Section */}
        <div className="text-center mt-5 p-4 bg-light rounded shadow-sm">
          <blockquote className="blockquote text-primary fs-4">
            “The best doctor gives the least medicine.” 
          </blockquote>
          <footer className="blockquote-footer mt-2">
            Benjamin Franklin
          </footer>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Appointments;
