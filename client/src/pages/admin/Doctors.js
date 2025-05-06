import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import axios from "../../axiosInstance";
import { message, Table, Popconfirm } from "antd";
import "../admin/Doctor.css";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
      message.error("Unable to fetch doctors");
    }
  };

  // Approve doctor
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/v1/admin/changeAccountStatus",
        {
          doctorId: record._id,
          userId: record.userId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        getDoctors(); // Refresh
      }
    } catch (error) {
      console.error("Error updating status:", error);
      message.error("Something went wrong while updating status");
    }
  };

  // Reject and delete doctor
  const handleRejectDoctor = async (record) => {
    try {
      const res = await axios.post(
        "/v1/admin/rejectDoctor",
        {
          doctorId: record._id,
          userId: record.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success("Doctor rejected and removed successfully");
        getDoctors();
      }
    } catch (error) {
      console.error("Reject doctor error:", error);
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <span className={`status-${status}`}>{status.toUpperCase()}</span>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        record.status === "pending" && (
          <div className="d-flex gap-2">
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
            <Popconfirm
              title="Reject and delete this doctor?"
              onConfirm={() => handleRejectDoctor(record)}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">Reject</button>
            </Popconfirm>
          </div>
        )
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table
        columns={columns}
        dataSource={doctors}
        rowKey="_id"
        className="animated-table"
        pagination={{ pageSize: 5 }}
      />
    </Layout>
  );
};

export default Doctors;
