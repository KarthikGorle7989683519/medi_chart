// components/DiagnosisHistory.jsx
import React from 'react';

const DiagnosisHistory = ({ patient }) => {
  if (!patient || !patient.diagnosis_history || patient.diagnosis_history.length === 0) {
    return (
      <div className="diagnosis-history">
        <h2>Diagnosis History</h2>
        <div className="no-data">No diagnosis history available</div>
      </div>
    );
  }

  // Get last 6 months of diagnosis history
  const sortedHistory = patient.diagnosis_history
    .sort((a, b) => {
      const dateA = new Date(`${a.month} 1, ${a.year}`);
      const dateB = new Date(`${b.month} 1, ${b.year}`);
      return dateB - dateA;
    })
    .slice(0, 6)
    .reverse();

  // Set current vitals (most recent)
  const currentVitals = sortedHistory.length > 0 ? {
    respiratoryRate: sortedHistory[sortedHistory.length - 1].respiratory_rate,
    temperature: sortedHistory[sortedHistory.length - 1].temperature,
    heartRate: sortedHistory[sortedHistory.length - 1].heart_rate
  } : null;

  // Calculate positions for the wave chart
  const getYPosition = (value, maxValue, chartHeight) => {
    return chartHeight - (value / maxValue) * chartHeight;
  };

  const generateSmoothPathData = (data, chartWidth, chartHeight, maxValue) => {
    if (!data || data.length === 0) return '';
    
    const segmentWidth = chartWidth / (data.length - 1);
    let pathData = `M 0 ${getYPosition(data[0], maxValue, chartHeight)}`;
    
    for (let i = 0; i < data.length - 1; i++) {
      const x1 = i * segmentWidth;
      const y1 = getYPosition(data[i], maxValue, chartHeight);
      const x2 = (i + 1) * segmentWidth;
      const y2 = getYPosition(data[i + 1], maxValue, chartHeight);
      
      // Calculate control points for smooth curves
      const controlX1 = x1 + segmentWidth * 0.5;
      const controlY1 = y1;
      const controlX2 = x1 + segmentWidth * 0.5;
      const controlY2 = y2;
      
      pathData += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${x2} ${y2}`;
    }
    
    return pathData;
  };

  const chartWidth = 400;
  const chartHeight = 120;
  const maxValue = 200;

  // Extract data for the chart
  const systolicData = sortedHistory.map(entry => entry.blood_pressure.systolic.value);
  console.log("dhhdd-----",patient.diagnosis_history[0].blood_pressure.systolic.value);
  
  const diastolicData = sortedHistory.map(entry => entry.blood_pressure.diastolic.value);
  const months = sortedHistory.map(entry => `${entry.month.substring(0, 3)}, ${entry.year.toString().substring(2)}`);

  const systolicPath = generateSmoothPathData(systolicData, chartWidth, chartHeight, maxValue);
  const diastolicPath = generateSmoothPathData(diastolicData, chartWidth, chartHeight, maxValue);

  return (
    <div className="diagnosis-history">
      <h2>Diagnosis History </h2>
      
      {/* Blood Pressure Section */}
      <div className="blood-pressure-section">
        <h3>Blood Pressure </h3>
        
        {/* Add the BP Legend here - make sure it's visible */}
        <div className="bp-legend">
          <div className="legend-item">
            <div className="color-box systolic"></div>
            <span>Systolic {patient.diagnosis_history[0].blood_pressure.systolic.value} {patient.diagnosis_history[0].blood_pressure.systolic.levels}</span>
          </div>
          <div className="legend-item">
            <div className="color-box diastolic"></div>
            <span>Diastolic {patient.diagnosis_history[0].blood_pressure.diastolic.value} {patient.diagnosis_history[0].blood_pressure.diastolic.levels}</span>
          </div>
        </div>
        
        <div className="bp-chart-container">
          <div className="bp-readings">
            <div className="bp-value">200</div>
            <div className="bp-value">180</div>
            <div className="bp-value">160</div>
            <div className="bp-value">140</div>
            <div className="bp-value">120</div>
            <div className="bp-value">100</div>
            <div className="bp-value">80</div>
            <div className="bp-value">60</div>
            <div className="bp-value">40</div>
            <div className="bp-value">20</div>
            <div className="bp-value">0</div>
          </div>
          
          <div className="wave-chart">
            <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
              {/* Grid lines */}
              {[0, 40, 80, 120, 160, 200].map((value, index) => (
                <line
                  key={value}
                  x1="0"
                  y1={getYPosition(value, maxValue, chartHeight)}
                  x2={chartWidth}
                  y2={getYPosition(value, maxValue, chartHeight)}
                  stroke="#f0f0f0"
                  strokeWidth="1"
                />
              ))}
              
              {/* Systolic wave (red) */}
              <path
                d={systolicPath}
                fill="none"
                stroke="#e53e3e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Diastolic wave (blue) */}
              <path
                d={diastolicPath}
                fill="none"
                stroke="#3182ce"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              
              {/* Data points for systolic */}
              {systolicData.map((value, index) => (
                <circle
                  key={`systolic-${index}`}
                  cx={index * (chartWidth / (systolicData.length - 1))}
                  cy={getYPosition(value, maxValue, chartHeight)}
                  r="4"
                  fill="#e53e3e"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
              
              {/* Data points for diastolic */}
              {diastolicData.map((value, index) => (
                <circle
                  key={`diastolic-${index}`}
                  cx={index * (chartWidth / (diastolicData.length - 1))}
                  cy={getYPosition(value, maxValue, chartHeight)}
                  r="4"
                  fill="#3182ce"
                  stroke="white"
                  strokeWidth="2"
                />
              ))}
            </svg>
            
            <div className="wave-months">
              {months.map((month, index) => (
                <div key={index} className="month-label">
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="bp-status">
          <span className="status-text">
            {sortedHistory.length > 0 
              ? sortedHistory[sortedHistory.length - 1].blood_pressure.systolic.levels 
              : 'No data'}
          </span>
        </div>
      </div>
                
      {/* Other Vital Signs */}
      {currentVitals && (
        <div className="vital-signs-grid">
          <div className="vital-sign">
            <h4>Respiratory Rate</h4>
            <div className="vital-value">{currentVitals.respiratoryRate.value} bpm</div>
            <div className={`status ${currentVitals.respiratoryRate.levels === 'Normal' ? 'normal' : 'abnormal'}`}>
              {currentVitals.respiratoryRate.levels}
            </div>
          </div>
          
          <div className="vital-sign">
            <h4>Temperature</h4>
            <div className="vital-value">{currentVitals.temperature.value}°F</div>
            <div className={`status ${currentVitals.temperature.levels === 'Normal' ? 'normal' : 'abnormal'}`}>
              {currentVitals.temperature.levels}
            </div>
          </div>
          
          <div className="vital-sign">
            <h4>Heart Rate</h4>
            <div className="vital-value">{currentVitals.heartRate.value} bpm</div>
            <div className={`status ${currentVitals.heartRate.levels.includes('Lower') ? 'lower' : 'normal'}`}>
              {currentVitals.heartRate.levels}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosisHistory;