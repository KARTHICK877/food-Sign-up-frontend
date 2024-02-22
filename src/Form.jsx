import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import GetLocation from './GetLocation';
import './App.css';
import { toast, ToastContainer } from 'react-toastify'// Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const SignUpForm = () => {
  const initialValues = {
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    address: '',
    pincode: '',
    city: '',
    dob: '',
    // modeOfDelivery: '',
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    mobileNumber: Yup.string().matches(/^\d{10}$/, 'Mobile number must be 10 digits').required('Mobile number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
    address: Yup.string().required('Address is required'),
    pincode: Yup.string().required('Pincode is required'),
    city: Yup.string().required('City is required'),
    // dob: Yup.date().required('Date of Birth is required'),
    // modeOfDelivery: Yup.string().required('Mode of Delivery is required'),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', values);
      console.log(response.data); // Handle success
      resetForm(); // Clear the form
      toast.success('Sign up successful'); // Show success toast
    } catch (error) {
      if (error.response && error.response.status === 400 && error.response.data.message === 'Email already exists') {
        toast.error('Email is already taken'); // Show error toast for existing email
      } else {
        console.error('Error:', error); // Handle other errors
      }
    } finally {
      setSubmitting(false);
    }
  };


  return (
    
    <div className='sign-up-form-container'>
     {/* <img src="./logo.png" width="20%" style={{}} alt="" /> */}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          
          <Form>
           

            <div className="form-group">
          
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" className="form-control" placeholder="Enter your name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number:</label>
              <Field type="text" name="mobileNumber" className="form-control" placeholder="Enter your mobile number" />
              <ErrorMessage name="mobileNumber" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" className="form-control" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" className="form-control" placeholder="Enter your password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <Field type="text" name="address" className="form-control" placeholder="Enter your address" />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="pincode">Pincode:</label>
              <Field type="text" name="pincode" className="form-control" placeholder="Enter your pincode" />
              <ErrorMessage name="pincode" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <Field type="text" name="city" className="form-control" placeholder="Enter your city" />
              <ErrorMessage name="city" component="div" className="error" />
            </div>
            <div className="form-group">
              <label htmlFor="dob">Date of Birth:</label>
              <Field type="date" name="dob" className="form-control" />
              {/* <ErrorMessage name="dob" component="div" className="error" /> */}
            </div>
            <GetLocation  />
            {/* <div className="form-group">
              <label htmlFor="modeOfDelivery">Mode of Delivery:</label>
              <Field as="select" name="modeOfDelivery" className="form-control">
                <option value="">Select Mode of Delivery</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Foot">Foot</option>
              </Field>
              <ErrorMessage name="modeOfDelivery" component="div" className="error" />
            </div> */}
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Sign Up</button>
          </Form>
        )}
      </Formik>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        onOpen={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      />
    </div>
  );
};

export default SignUpForm;
