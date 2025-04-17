import React, { useState, useEffect } from "react";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message, Breadcrumb } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "../styles/LayoutStyles.css";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  const quotes = [
    "🏥 Caring for Life – Every Step of the Way",
    "💙 Your Health, Our Mission",
    "🩺 Quality Healthcare You Can Trust",
    "🌿 Healing with Compassion and Excellence",
    "👨‍⚕️ Where Care Meets Technology",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const currentQuote = quotes[currentQuoteIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    { name: "Appointments", path: "/doctor-appointments", icon: "fa-solid fa-list" },
  ];

  if (user?.isDoctor) {
    doctorMenu.push({
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    });
  }

  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <div className="d-flex min-vh-100">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="sidebar bg-light border-end px-3 d-flex flex-column transition-all"
          style={{ width: "250px" }}
        >
          <div className="text-center my-3">
            <h5 className="text-primary fw-bold">🏥 DOC APP</h5>
            <hr />
          </div>

          <div className="mb-3">
            <Breadcrumb>
              <Breadcrumb.Item onClick={() => navigate("/")}>Home</Breadcrumb.Item>
              <Breadcrumb.Item>{location.pathname.split("/")[1]}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <nav className="nav flex-column">
            {SidebarMenu.map((menu, index) => {
              if (menu.name === "Profile" && !user?.isDoctor) return null;
              const isActive = location.pathname === menu.path;
              return (
                <Link
                  key={index}
                  to={menu.path}
                  className={`nav-link d-flex align-items-center rounded mb-2 ${
                    isActive ? "bg-primary text-white" : "text-dark"
                  }`}
                  style={{
                    padding: "10px 12px",
                    transition: "background-color 0.3s, color 0.3s",
                  }}
                >
                  <i className={`${menu.icon} me-2`}></i>
                  {menu.name}
                </Link>
              );
            })}

            <div
              className="nav-link d-flex align-items-center text-danger mt-auto"
              style={{ cursor: "pointer", padding: "10px 12px" }}
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Logout
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Header */}
        <header className="d-flex justify-content-between align-items-center p-3 shadow-sm bg-white">
          <button
            className="btn btn-outline-primary me-3"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <i className="fa fa-bars"></i>
          </button>

          <div className="flex-grow-1 text-center">
            <p className="mb-0 text-primary fw-semibold fs-6 animate__animated animate__fadeInLeft">
              {currentQuote}
            </p>
          </div>

          <div className="d-flex align-items-center">
            <Badge
              count={user?.notifcation?.length || 0}
              onClick={() => navigate("/notification")}
              style={{ cursor: "pointer" }}
            >
              <i className="fa-solid fa-bell fa-shake text-danger fs-5 me-3 animate__animated animate__pulse animate__infinite"></i>
            </Badge>
            <span className="text-uppercase text-dark fw-semibold me-3 animate__animated animate__fadeInRight">
              {user?.name}
            </span>
          </div>
        </header>

        <main className="flex-grow-1 p-3 bg-white">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
