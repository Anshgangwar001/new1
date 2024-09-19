import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import './ProfessorSignupLogin.css';

const ProfessorSignupLogin = () => {
  const [isSignup, setIsSignup] = React.useState(true);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  // API URLs for signup and login (replace with your actual API URLs)
  const SIGNUP_API_URL = 'https://your-backend-api.com/professors/signup';
  const LOGIN_API_URL = 'https://your-backend-api.com/professors/login';

  // Validation schema for signup and login
  const validationSchema = isSignup
    ? Yup.object({
        name: Yup.string().required('Name is required'),
        collegeName: Yup.string().required('College Name is required'),
        username: Yup.string().required('Username is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters long')
          .required('Password is required'),
      })
    : Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters long')
          .required('Password is required'),
      });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const apiUrl = isSignup ? SIGNUP_API_URL : LOGIN_API_URL;
    
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert(isSignup ? 'Professor account created successfully!' : 'Logged in successfully!');
        resetForm();
      } else {
        alert(`Error: ${data.message || 'Something went wrong'}`);
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      className="professor-form-container"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>{isSignup ? 'Professor Signup' : 'Professor Login'}</h2>
      <Formik
        initialValues={isSignup 
          ? { name: '', collegeName: '', username: '', password: '' } 
          : { username: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {isSignup && (
              <>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <Field name="name" type="text" className="input-field" />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="collegeName">College Name</label>
                  <Field name="collegeName" type="text" className="input-field" />
                  <ErrorMessage name="collegeName" component="div" className="error-message" />
                </div>
              </>
            )}

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
              {isSignup ? (isSubmitting ? 'Creating Account...' : 'Sign Up') : (isSubmitting ? 'Logging In...' : 'Login')}
            </button>
          </Form>
        )}
      </Formik>
      <p onClick={toggleForm} className="toggle-link">
        {isSignup
          ? "Already have an account? Login"
          : "Don't have an account? Signup"}
      </p>
    </motion.div>
  );
};

export default ProfessorSignupLogin;
