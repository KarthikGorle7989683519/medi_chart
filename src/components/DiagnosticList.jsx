// components/DiagnosticList.jsx
import React from 'react';

const DiagnosticList = ({ diagnosticList }) => {
  if (!diagnosticList || diagnosticList.length === 0) {
    return (
      <div className="diagnostic-list">
        <h3>Diagnostic List</h3>
        <div className="no-data">No diagnostic information available</div>
      </div>
    );
  }

  return (
    <div className="diagnostic-list">
      <h3>Diagnostic List</h3>
      
      <div className="diagnoses-container">
        {diagnosticList.map((diagnosis, index) => (
          <div key={index} className="diagnosis-item">
            <div className="diagnosis-name">{diagnosis.name}</div>
            <div className="diagnosis-description">{diagnosis.description}</div>
            <div className={`diagnosis-status ${diagnosis.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {diagnosis.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiagnosticList;