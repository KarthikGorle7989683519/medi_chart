// components/PatientList.jsx
import React from 'react';

const PatientList = ({ patients, selectedPatient, onSelectPatient }) => {
  return (
    <div className="patient-list">
      <h2>PATIENTS</h2>
      <div className="patients-container">
        {patients.map(patient => (
          <div 
            key={patient.name}
            className={`patient-item ${selectedPatient && selectedPatient.name === patient.name ? 'selected' : ''}`}
            onClick={() => onSelectPatient(patient)}
          >
            <div className="patient-avatar">
              <img src={patient.profile_picture} alt={patient.name} />
            </div>
            <div className="patient-info">
              <h3>{patient.name}</h3>
              <p>{patient.gender},{patient.age}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientList;