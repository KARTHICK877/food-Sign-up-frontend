import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import GetLocation from './GetLocation';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    name: '',
    mobileNumber: '',
    email: '',
    password: '',
    address: '',
    pincode: '',
    city: '',
    dob: '',
    modeOfDelivery: '',
  };

 const validationSchema = Yup.object().shape({
  name: Yup.string().required(<span style={{ color: 'red' }}> 'Name is required' </span>),
  mobileNumber: Yup.string().matches(/^\d{10}$/, <span style={{ color: 'red' }}>
     'Mobile number must be 10 digits' </span>).required(<span style={{ color: 'red' }}> 'Mobile number is required' </span>),
  email: Yup.string().email(<span style={{ color: 'red' }}> 'Invalid email address' </span>).required(<span style={{ color: 'red' }}> 'Email is required' </span>),
  password: Yup.string().required(<span style={{ color: 'red' }}> 'Password is required' </span>),
  address: Yup.string().required(<span style={{ color: 'red' }}> 'Address is required' </span>),
  pincode: Yup.string().required(<span style={{ color: 'red' }}> 'Pincode is required' </span>),
  city: Yup.string().required(<span style={{ color: 'red' }}> 'City is required' </span>),
  // dob: Yup.date().required(<span style={{ color: 'red' }}> 'Date of Birth is required' </span>),
  // modeOfDelivery: Yup.string().required(<span style={{ color: 'red' }}> 'Mode of Delivery is required' </span>),
});


const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  setIsSubmitting(true); // Start submitting

  try {
    const response = await axios.post('https://backend-form-1.onrender.com/api/signup', values);
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
    setIsSubmitting(false); // Stop submitting
  }
};

  return (
    
    <div className='sign-up-form-container' >
      <video src="./foods.mp4" autoPlay loop muted >       </video>
      {/* <video  src={"./foods.mp4"}
          alt="Temporary Video"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
          autoPlay
          muted
          loop> */}
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
              <ErrorMessage name="dob" component="div" className="error" />
            </div>
            <GetLocation  />
            <div className="form-group">
              <label htmlFor="modeOfDelivery">Mode of Delivery:</label>
              <Field as="select" name="modeOfDelivery" className="form-control">
                <option value="">Select Mode of Delivery</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Foot">Foot</option>
              </Field>
              <ErrorMessage name="modeOfDelivery" component="div" className="error" />
            </div>
             <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting && <Spinner />}
              {!isSubmitting && 'Sign Up'}
            </button>
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
const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
    </div>
  );
};
export default SignUpForm;
