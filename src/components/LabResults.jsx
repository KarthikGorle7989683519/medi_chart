// components/LabResults.jsx
import React from 'react';

const LabResults = ({ labResults }) => {
  if (!labResults || labResults.length === 0) {
    return (
      <div className="lab-results">
        <h3>Lab Results</h3>
        <div className="no-data">No lab results available</div>
      </div>
    );
  }

  const handleDownload = (testName) => {
    console.log(`Downloading ${testName}`);
    // Actual download logic would go here
  };

  return (
    <div className="lab-results">
      <h3>Lab Results</h3>
      
      <div className="lab-tests">
        {labResults.map((test, index) => (
          <div key={index} className="lab-test-item">
            <span className="test-name">{test}</span>
            <button 
              className="download-btn icon-only"
              onClick={() => handleDownload(test)}
              title={`Download ${test}`}
            >
              <svg className="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabResults;