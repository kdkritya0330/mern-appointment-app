import React from "react";
import { useNavigate } from "react-router-dom";
import "animate.css";


const Error404 = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 bg-light text-center p-4">
      {/* Animated Icon */}
      <div className="animate__animated animate__bounceIn">
        <span style={{ fontSize: "6rem" }} className="text-warning">😵‍💫</span>
      </div>

      {/* 404 Heading */}
      <h1 className="display-1 fw-bold text-danger mt-3 animate__animated animate__flash animate__delay-1s">
        404
      </h1>

      {/* Subheading */}
      <p className="fs-4 text-secondary animate__animated animate__fadeInDown animate__delay-1s">
        Whoops! We can't seem to find the page you're looking for.
      </p>

      {/* Go Home Button */}
      <button
        onClick={() => navigate("/")}
        className="btn btn-outline-primary btn-lg mt-4 px-4 py-2 animate__animated animate__pulse animate__infinite"
        style={{ transition: "transform 0.2s" }}
        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <i className="fa-solid fa-house me-2"></i>
        Take Me Home
      </button>
    </div>
  );
};

export default Error404;
