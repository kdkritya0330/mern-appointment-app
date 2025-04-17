import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  const renderTooltip = (props) => (
    <Tooltip id={`tooltip-${doctor._id}`} {...props}>
      Click to book appointment with Dr. {doctor.firstName} {doctor.lastName}
    </Tooltip>
  );

  return (
    <OverlayTrigger placement="top" overlay={renderTooltip}>
      <Card
        className="border-0 h-100 shadow-sm bg-white transition-all"
        style={{ cursor: "pointer", transition: "transform 0.3s, box-shadow 0.3s" }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.classList.add("shadow");
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.classList.remove("shadow");
        }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        <Card.Body>
          <Card.Title className="text-primary fw-bold fs-5 mb-3">
            Dr. {doctor.firstName} {doctor.lastName}
          </Card.Title>
          <Card.Text className="mb-1">
            <strong>Specialization:</strong> {doctor.specialization}
          </Card.Text>
          <Card.Text className="mb-1">
            <strong>Experience:</strong> {doctor.experience} years
          </Card.Text>
          <Card.Text className="mb-1">
            <strong>Fees Per Consultation:</strong> ₹{doctor.feesPerCunsaltation}
          </Card.Text>
          <Card.Text className="mb-3">
            <strong>Timings:</strong> {doctor.timings[0]} - {doctor.timings[1]}
          </Card.Text>
          <Button variant="outline-primary" size="sm">
            Book Appointment
          </Button>
        </Card.Body>
      </Card>
    </OverlayTrigger>
  );
};

export default DoctorList;
