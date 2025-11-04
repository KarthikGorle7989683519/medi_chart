// components/PatientDetails.jsx
import React from 'react';

const PatientDetails = ({ patient }) => {
  if (!patient) {
    return (
      <div className="patient-details">
        <div className="no-patient-selected">
          Select a patient to view details
        </div>
      </div>
    );
  }

  return (
    <div className="patient-details">
      <div className="patient-header">
        <div className="patient-profile" style={{ alignItems: 'center' }}>
          <img src={patient.profile_picture} alt={patient.name} className="profile-image" />
          <div className="profile-info">
            <h2>{patient.name}</h2>
            <p>{patient.gender}, {patient.age} years old</p>
            <div>
              <strong>Date of Birth:</strong> {patient.date_of_birth}
            </div>
            <div>
              <strong>Phone:</strong> {patient.phone_number}
            </div>
            <div>
              <strong>Emergency Contact:</strong> {patient.emergency_contact}
            </div>
            <div>
              <strong>Insurance:</strong> {patient.insurance_type}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;

