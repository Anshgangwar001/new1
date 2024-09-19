import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Homepage';
import StudentSignup from './components/StudentSignup'; 
import StudentLogin from './components/StudentLogin';
import ProfessorSignupLogin from './components/ProfessorSignupLogin';
import CollegeRegister from './components/CollegeRegister';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Bootstrap Container for padding and layout */}
        <div className="container">
          <Routes>
            {/* Route for Home Page */}
            <Route path="/" element={<HomePage />} />

            {/* Student Routes */}
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/student-login" element={<StudentLogin />} />

            {/* Professor Sign Up/Login */}
            <Route path="/professor-signup-login" element={<ProfessorSignupLogin />} />

            {/* College Register Route */}
            <Route path="/college-register" element={<CollegeRegister />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
