import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import './StudentSignup.css';

const StudentSignup = () => {
  // API URL for signup (replace with your actual backend API URL)
  const SIGNUP_API_URL = 'https://your-backend-api.com/students/signup';

  // Define validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    batch: Yup.string().required('Batch is required'),
    year: Yup.string().required('Year is required'),
    college: Yup.string().required('College is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters long')
      .required('Password is required'),
  });

  const initialValues = {
    name: '',
    batch: '',
    year: '',
    college: '',
    username: '',
    password: '',
  };

  // Handle form submission
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch(SIGNUP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Student account created successfully!');
        resetForm();
      } else {
        alert(`Error: ${data.message || 'Signup failed'}`);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="signup-form"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Student Sign-Up</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <Field name="name" type="text" className="input-field" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="batch">Batch</label>
              <Field name="batch" type="text" className="input-field" />
              <ErrorMessage name="batch" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year</label>
              <Field as="select" name="year" className="input-field">
                <option value="">Select your year</option>
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
              </Field>
              <ErrorMessage name="year" component="div" className="error-message" />
            </div>

            <div className="form-group">
              <label htmlFor="college">College</label>
              <Field name="college" type="text" className="input-field" />
              <ErrorMessage name="college" component="div" className="error-message" />
            </div>

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

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Creating Account...' : 'Sign Up'}
            </button>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default StudentSignup;
