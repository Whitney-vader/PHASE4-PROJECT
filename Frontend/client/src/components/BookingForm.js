import React, { useState, useEffect } from 'react';
import api from '../services/api';

const BookingForm = () => {
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [users, setUsers] = useState([]);
  const [propertyId, setPropertyId] = useState('');
  const [userId, setUserId] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [message, setMessage] = useState('');

  const fetchBookings = async () => {
    try {
      const response = await api.get('/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
    fetchProperties();
    fetchUsers();
  }, []);

  const handleCreateBooking = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings', { propertyId, userId, bookingDate, message });
      await fetchBookings();
      setPropertyId('');
      setUserId('');
      setBookingDate('');
      setMessage('');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await api.delete(`/bookings/${id}`);
      await fetchBookings();
    } catch (error) {
      console.error(`Error deleting booking with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleCreateBooking}>
        <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)} required>
          <option value="">Select Property</option>
          {properties.map(property => (
            <option key={property.id} value={property.id}>{property.address}</option>
          ))}
        </select>
        <select value={userId} onChange={(e) => setUserId(e.target.value)} required>
          <option value="">Select User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
        <input type="date" placeholder="Booking Date" value={bookingDate} onChange={(e) => setBookingDate(e.target.value)} required />
        <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
        <button type="submit">Create Booking</button>
      </form>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            {booking.property.address} - {booking.user.name} - {booking.bookingDate}
            <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingForm;
