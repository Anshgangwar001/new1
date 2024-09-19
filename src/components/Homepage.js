import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [features, setFeatures] = useState([]);
  const [colleges, setColleges] = useState([]);

  // API endpoint for features and colleges (replace with your actual API URLs)
  const FEATURES_API_URL = 'https://your-backend-api.com/features';
  const COLLEGES_API_URL = 'https://your-backend-api.com/colleges';

  // Fetch features from the backend (GET request)
  useEffect(() => {
    fetch(FEATURES_API_URL)
      .then(response => response.json())
      .then(data => setFeatures(data))
      .catch(error => console.error('Error fetching features:', error));
  }, []);

  // Fetch colleges from the backend (GET request)
  useEffect(() => {
    fetch(COLLEGES_API_URL)
      .then(response => response.json())
      .then(data => setColleges(data))
      .catch(error => console.error('Error fetching colleges:', error));
  }, []);

  return (
    <div className="homepage">
      <section className="welcome-section">
        <h1>
          <img src="/logo-with-text.png" alt="Code Catalyst Logo" className="logo" />
          Welcome to Code Catalyst
        </h1>
        <p>Ignite your coding journey with our revolutionary platform.</p>

        {/* Header Section */}
        <section className="header">
          <nav className="nav-links">
            <Link to="/student-login" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                <path d="M12 12a5 5 0 110-10 5 5 0 010 10zm7 2h-2v1a5 5 0 01-10 0v-1H5a5 5 0 00-5 5v1h24v-1a5 5 0 00-5-5z"/>
              </svg>
              Student
            </Link>
            <Link to="/professor-signup-login" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                <path d="M12 12a5 5 0 110-10 5 5 0 010 10zm7 2h-2v1a5 5 0 01-10 0v-1H5a5 5 0 00-5 5v1h24v-1a5 5 0 00-5-5z"/>
              </svg>
              Professor
            </Link>
            <Link to="/college-register" className="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="icon">
                <path d="M12 12a5 5 0 110-10 5 5 0 010 10zm7 2h-2v1a5 5 0 01-10 0v-1H5a5 5 0 00-5 5v1h24v-1a5 5 0 00-5-5z"/>
              </svg>
              College
            </Link>
          </nav>
        </section>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          {features.length === 0 ? (
            <p>Loading features...</p>
          ) : (
            features.map((feature, index) => (
              <div className="feature-box" key={index}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Colleges Section */}
      <section className="colleges-section">
        <h2>Registered Colleges</h2>
        {colleges.length === 0 ? (
          <p>No colleges registered yet.</p>
        ) : (
          <ul>
            {colleges.map((college, index) => (
              <li key={index}>{college.collegeName}</li>
            ))}
          </ul>
        )}
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <p>&copy; 2024 Code Catalyst. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
