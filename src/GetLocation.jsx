import React, { useState, useEffect } from 'react';
import './App.css'
const GetLocation = () => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    const getMyLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            console.error('Error getting geolocation:', error);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    };

    getMyLocation();
  }, []);

  return (
    <div className='get-location-container'>
      <p style={{fontWeight:"bold"}}>Your location is:</p>
      <input c type="text" value={latitude} placeholder="Latitude" readOnly />
      <input type="text" value={longitude} placeholder="Longitude" readOnly />
    </div>
  );
};

export default GetLocation;
