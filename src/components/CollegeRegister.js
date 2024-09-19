import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import './CollegeRegister.css';

// Validation schema using Yup
const validationSchema = Yup.object({
  collegeName: Yup.string().required('College Name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
  phoneNumber: Yup.string().matches(/^\d+$/, 'Phone number must be digits only').length(10, 'Phone number must be 10 digits').required('Phone number is required'),
  name: Yup.string().required('Your Name is required'),
});

const CollegeRegister = () => {
  const [colleges, setColleges] = useState([]);

  // API endpoint URL (replace with your actual backend API URL)
  const API_URL = 'https://your-backend-api.com/colleges';

  // Fetch the list of registered colleges (GET request)
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setColleges(data))
      .catch(error => console.error('Error fetching colleges:', error));
  }, []);

  // Submit form data to the backend (POST request)
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);

    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Form Data', data);
        resetForm();
        alert('College registered successfully!');
        setSubmitting(false);
      })
      .catch(error => {
        console.error('Error registering college:', error);
        setSubmitting(false);
      });
  };

  return (
    <motion.div
      className="register-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Register Your College</h2>
      <Formik
        initialValues={{ collegeName: '', email: '', password: '', phoneNumber: '', name: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="collegeName">College Name</label>
              <Field name="collegeName" type="text" className="input-field" />
              <ErrorMessage name="collegeName" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <Field name="name" type="text" className="input-field" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="input-field" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <Field name="phoneNumber" type="text" className="input-field" />
              <ErrorMessage name="phoneNumber" component="div" className="error-message" />
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>

      {/* Display registered colleges */}
      <div className="colleges-list">
        <h3>Registered Colleges</h3>
        {colleges.length === 0 ? (
          <p>No colleges registered yet.</p>
        ) : (
          <ul>
            {colleges.map((college, index) => (
              <li key={index}>{college.collegeName}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default CollegeRegister;
