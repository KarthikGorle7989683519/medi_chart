// App.jsx
import React, { useState, useEffect } from 'react';
import './App.css';

// Components
import PatientList from './components/PatientList';
import PatientDetails from './components/PatientDetails';
import DiagnosisHistory from './components/DiagnosisHistory';
import DiagnosticList from './components/DiagnosticList';
import LabResults from './components/LabResults';
import Header from './components/Header';

function App() {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch patient data from API
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch('https://fedskillstest.coalitiontechnologies.workers.dev', {
          method: 'GET',
          headers: {
            'Authorization': 'Basic ' + btoa('coalition:skills-test'),
            'Content-Type': 'application/json'
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch patient data');
        }
        
        const data = await response.json();
        console.log('Fetched patient data:', data);
        setPatients(data);
        
        // Select first patient by default
        if (data.length > 0) {
          setSelectedPatient(data[0]);
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search term
  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading patient data...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="app">
      <Header/>
      
      <div className="app-container">
        {/* Sidebar with patient list */}
        <aside className="sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <PatientList 
            patients={filteredPatients}
            selectedPatient={selectedPatient}
            onSelectPatient={setSelectedPatient}
          />
        </aside>
        
        {/* Main content area */}
        <main className="main-content">
          {selectedPatient ? (
            <>
              <div className="medical-data">
                <div className="data-section">
                  <DiagnosisHistory patient={selectedPatient} />
                </div>
                
                <div className="data-section">
                  <DiagnosticList diagnosticList={selectedPatient.diagnostic_list} />
                </div>
              </div>
            </>
          ) : (
            <div className="no-patient-selected">
              Select a patient to view details
            </div>
          )}
        </main>
        
        {/* Right panel */}
        <div className="right-panel">
          <PatientDetails patient={selectedPatient} />
          <LabResults labResults={selectedPatient ? selectedPatient.lab_results : []} />
        </div>
      </div>
    </div>
  );
}

export default App;