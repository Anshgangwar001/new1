import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // Main App component with routes for HomePage, Signup, Login, etc.
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importing Bootstrap globally

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Rendering the main App component */}
  </React.StrictMode>
);

// For performance measurement in your app
reportWebVitals(console.log); // Logs web vitals (you can change or remove this as needed)
