import React, { useEffect, useState } from "react";
import axios from "../axiosInstance";
import Layout from "./../components/Layout";
import { Spinner } from "react-bootstrap";
import DoctorList from "../components/DoctorList";
import hospitalImage from "../assets/Hospital1.jpg";
import hospitalTechImage from "../assets/Hospital3.jpg";
import CountUp from "react-countup";
import "animate.css";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [aboutIndex, setAboutIndex] = useState(0);
  const [statIndex, setStatIndex] = useState(0);

  const aboutTexts = [
    "At Ritesh Hospital, we combine cutting-edge technology with compassionate care to serve our patients.",
    "Our experienced medical team offers expert consultations and patient-first treatment plans.",
    "From diagnostics to surgery, we strive for excellence in every healthcare journey.",
    "We care for your family like our own, 24/7, with world-class infrastructure and doctors.",
  ];

  const stats = [
    { end: 70, label: "YEARS OF EXPERIENCE" },
    { end: 37, label: "HOSPITALS" },
    { end: 5600, label: "DOCTORS" },
    { end: 10500, label: "BEDS" },
    { end: 19, label: "SERVING CITIES" },
    { end: 45000000, label: "LIVES TOUCHED" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAboutIndex((prev) => (prev + 1) % aboutTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStatIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get("//v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="d-flex flex-column min-vh-100">
        <div className="flex-grow-1">
          {/* Hero Section */}
          <div
            className="text-white text-center d-flex flex-column justify-content-center align-items-center"
            style={{
              backgroundImage: `url(${hospitalImage})`,
              height: "400px",
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                width: "100%",
                padding: "50px 0",
              }}
            >
              <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">
                Ritesh Hospital
              </h1>
              <p className="lead animate__animated animate__fadeInUp">
                Dedicated to Excellence in Healthcare
              </p>
            </div>
          </div>

          {/* About Section */}
          <div className="container py-5">
            <h2 className="text-center fw-bold text-primary mb-4">About Us</h2>
            <div className="row align-items-center">
              <div className="col-md-6 mb-4 mb-md-0 animate__animated animate__zoomIn">
                <img
                  src={hospitalTechImage}
                  alt="Advanced Equipment"
                  className="img-fluid rounded shadow"
                />
              </div>
              <div className="col-md-6 animate__animated animate__fadeInRight">
                <p className="text-muted text-center text-md-start fs-5">
                  {aboutTexts[aboutIndex]}
                </p>
              </div>
            </div>
          </div>

          {/* Animated Statistics Section */}
          <div className="container py-5">
            <div className="row justify-content-center text-center">
              <div className="col-md-4 animate__animated animate__fadeInUp">
                <h2 className="fw-bold text-primary display-4">
                  <CountUp start={0} end={stats[statIndex].end} duration={2.5} separator="," />+
                </h2>
                <p className="text-muted fs-5">{stats[statIndex].label}</p>
              </div>
            </div>
          </div>

          {/* Doctor Section */}
          <div className="container pb-5">
            <div className="text-center mb-4">
              <h2 className="fw-bold text-primary">Meet Our Expert Doctors</h2>
              <p className="text-muted">
                Providing exceptional healthcare with compassion and care.
              </p>
            </div>

            {loading ? (
              <div className="d-flex justify-content-center my-5">
                <Spinner animation="border" variant="primary" />
              </div>
            ) : (
              <div className="row">
                {doctors.map((doctor, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <DoctorList doctor={doctor} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
