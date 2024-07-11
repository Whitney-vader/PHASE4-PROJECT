// src/components/BookingDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const BookingDetail = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await api.get(`/bookings/${id}`);
        setBooking(response.data); // Assuming API response is a single booking object
      } catch (error) {
        console.error(`Error fetching booking with ID ${id}:`, error);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) return <p>Loading booking details...</p>;

  return (
    <div>
      <h2>{booking.property_id}</h2>
      <p>{booking.user_id}</p>
      {/* Add more booking details here */}
    </div>
  );
};

export default BookingDetail;
