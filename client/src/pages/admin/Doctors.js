import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "../axiosInstance";
import { message, Table } from "antd";
import "../admin/Doctor.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Get all doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Approve doctor
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctors(); // Refresh list
      }
    } catch (error) {
      message.error("Something went wrong.");
    }
  };

  // Reject and delete doctor
  const handleRejectDoctor = async (record) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/rejectDoctor",
        { doctorId: record._id, userId: record.userId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Doctor rejected and removed successfully");
        getDoctors(); // Refresh list
      }
    } catch (error) {
      message.error("Failed to reject the doctor");
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex gap-2">
          {record.status === "pending" && (
            <>
              <button
                className="btn btn-success"
                onClick={() => handleAccountStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleRejectDoctor(record)}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table
        columns={columns}
        dataSource={doctors}
        rowClassName="table-row"
        className="animated-table"
      />
    </Layout>
  );
};

export default Doctors;
