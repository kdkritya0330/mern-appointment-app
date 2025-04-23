import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs, Empty } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";
import { motion } from "framer-motion";

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  // Mark all as read
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/v1/user/get-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      res.data.success
        ? message.success(res.data.message)
        : message.error(res.data.message);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong while marking as read");
    }
  };

  // Delete all read
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      res.data.success
        ? message.success(res.data.message)
        : message.error(res.data.message);
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong while deleting notifications");
    }
  };

  return (
    <Layout>
      <div className="container py-4">
        <h2 className="text-center text-primary mb-4">🔔 Notification Center</h2>
        <Tabs defaultActiveKey="0" centered>
          <Tabs.TabPane tab="Unread Notifications" key="0">
            <div className="d-flex justify-content-end mb-3">
              <button
                className="btn btn-outline-success"
                onClick={handleMarkAllRead}
              >
                Mark All as Read
              </button>
            </div>
            {user?.notifcation?.length > 0 ? (
              user.notifcation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card mb-3 border-start border-4 border-warning shadow-sm"
                  style={{ cursor: "pointer", backgroundColor: "#fffbe6" }}
                  onClick={() => navigate(msg.onClickPath)}
                >
                  <div className="card-body">
                    <h6 className="card-text text-dark">{msg.message}</h6>
                  </div>
                </motion.div>
              ))
            ) : (
              <Empty description="No Unread Notifications" />
            )}
          </Tabs.TabPane>

          <Tabs.TabPane tab="Read Notifications" key="1">
            <div className="d-flex justify-content-end mb-3">
              <button
                className="btn btn-outline-danger"
                onClick={handleDeleteAllRead}
              >
                Delete All Read
              </button>
            </div>
            {user?.seennotification?.length > 0 ? (
              user.seennotification.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="card mb-3 border-start border-4 border-success shadow-sm"
                  style={{ cursor: "pointer", backgroundColor: "#e6ffed" }}
                  onClick={() => navigate(msg.onClickPath)}
                >
                  <div className="card-body">
                    <h6 className="card-text text-muted">{msg.message}</h6>
                  </div>
                </motion.div>
              ))
            ) : (
              <Empty description="No Read Notifications" />
            )}
          </Tabs.TabPane>
        </Tabs>

        {/* Motivational Quote */}
        <div className="text-center mt-5 p-4 bg-light rounded shadow-sm">
          <blockquote className="blockquote text-secondary fs-5">
            “To know even one life has breathed easier because you have lived — that is to have succeeded.”
          </blockquote>
          <footer className="blockquote-footer mt-2">Ralph Waldo Emerson</footer>
        </div>
      </div>
    </Layout>
  );
};

export default NotificationPage;
