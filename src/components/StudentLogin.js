import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './StudentLogin.css';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
});

const StudentLogin = () => {
  // API URL for login (replace with your actual backend API URL)
  const LOGIN_API_URL = 'https://your-backend-api.com/students/login';

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(LOGIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Logged in successfully!');
        resetForm();
      } else {
        alert(`Error: ${data.message || 'Login failed'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="login-form"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Student Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <Field name="username" type="text" className="input-field" />
              <ErrorMessage name="username" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field name="password" type="password" className="input-field" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Logging In...' : 'Login'}
            </button>

            <div className="signup-prompt">
              <p>Don't have an account?</p>
              <Link to="/student-signup" className="signup-link">
                Sign Up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default StudentLogin;
