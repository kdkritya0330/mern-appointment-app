import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "../axiosInstance";
import { DatePicker, message, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import "animate.css";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]); // List of doctors
  const [selectedDoctor, setSelectedDoctor] = useState(null); // Selected doctor for appointment
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();

  // Fetching all doctors
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/doctor/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data); // Assuming res.data.data is the list of doctors
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetching doctor details by ID (For booking specific doctor)
  const getDoctorById = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setSelectedDoctor(res.data.data); // Fetching specific doctor's details
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Check Availability
  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // Handle Booking
  const handleBooking = async () => {
    try {
      if (!date || !time) {
        return alert("Date & Time Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: selectedDoctor,
          userInfo: user,
          date: date,
          time: time,
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
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors(); // Fetch all doctors
    getDoctorById(); // Fetch specific doctor details by ID
  }, []);

  return (
    <Layout>
      <div className="container mt-4 animate__animated animate__fadeInUp">
        <h3 className="text-center animate__animated animate__zoomIn">Book an Appointment</h3>
        
        {/* Display the details of the selected doctor */}
        {selectedDoctor && (
          <div className="card shadow p-4 mb-4 bg-white rounded">
            <h4 className="text-success">
              Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
            </h4>
            <p className="mb-2"><strong>Fees:</strong> ₹{selectedDoctor.feesPerCunsaltation}</p>
            <p className="mb-3"><strong>Timings:</strong> {selectedDoctor.timings && selectedDoctor.timings[0]} - {selectedDoctor.timings && selectedDoctor.timings[1]}</p>

            <div className="d-flex flex-column flex-md-row gap-3">
              <DatePicker
                className="form-control"
                format="DD-MM-YYYY"
                onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
              />
              <TimePicker
                className="form-control"
                format="HH:mm"
                onChange={(value) => setTime(moment(value).format("HH:mm"))}
              />
            </div>

            <div className="mt-4 d-flex gap-3">
              <button
                className="btn btn-outline-primary w-100 animate__animated animate__pulse"
                onClick={handleAvailability}
              >
                Check Availability
              </button>
              <button
                className="btn btn-success w-100 animate__animated animate__bounceIn"
                onClick={handleBooking}
              >
                Book Now
              </button>
            </div>
          </div>
        )}

        {/* Hospital Info Section */}
        <div className="bg-light p-4 mt-5 rounded shadow-lg animate__animated animate__fadeInUp">
          <h4 className="text-primary text-center mb-3 animate__animated animate__zoomIn">Welcome to Apollo Hospital</h4>
          <div className="row">
            <div className="col-md-6">
              <div className="animate__animated animate__fadeInLeft">
                <h5 className="text-success">Our Services</h5>
                <ul>
                  <li>👩‍⚕️ Emergency Services</li>
                  <li>🩺 General Medicine</li>
                  <li>💉 Vaccinations & Preventative Care</li>
                  <li>🦷 Orthopedics</li>
                  <li>🧑‍⚕️ Pediatrics</li>
                  <li>💖 Cardiology</li>
                  <li>🧠 Neurology</li>
                  <li>🏥 Diagnostic Services</li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div className="animate__animated animate__fadeInRight">
                <h5 className="text-success">Meet Our Doctors</h5>
                <p>
                  At Apollo Hospital, our doctors are committed to providing compassionate care and expert treatments. Here are some of the specialties:
                </p>
                <ul>
  {doctors.length > 0 ? (
    doctors.map((doctor) => (
      <li key={doctor._id}>
        {doctor.specialty
          ? `👨‍⚕️ Dr. ${doctor.firstName} ${doctor.lastName} – ${doctor.specialty}`
          : `👨‍⚕️ Dr. ${doctor.firstName} ${doctor.lastName}`}
      </li>
    ))
  ) : (
    <li>No doctors available</li>
  )}
</ul>

              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="animate__animated animate__fadeInDown">
              🏥 <strong>Location:</strong> 123 Health Avenue, Pune, Maharashtra
              <br />
              📞 <strong>Contact:</strong> +91-9876543210
              <br />
              🌐 <a href="https://apollohospitals.com" className="text-primary text-decoration-underline animate__animated animate__heartBeat" target="_blank" rel="noreferrer">Visit our website</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
