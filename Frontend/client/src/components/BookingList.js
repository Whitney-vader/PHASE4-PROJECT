// // src/components/BookingList.js

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const BookingList = () => {
//   const [bookings, setBookings] = useState([]);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await api.get('/bookings');
//         setBookings(response.data); // Assuming API response is an array of bookings
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   return (
//     <div>
//       <h2>Bookings</h2>
//       <ul>
//         {bookings.map(booking => (
//           <li key={booking.id}>
//             <h3>{booking.property_id}</h3>
//             <p>{booking.user_id}</p>
//             {/* Add more booking details here */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default BookingList;


import React, { useState, useEffect } from 'react';
import { fetchBookings } from '../services/api'; // Import API function for fetching bookings
import mockBookings from '../mockData'; // Import mock bookings data

const useMockData = true; // Set to true during development or testing

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (useMockData) {
          setBookings(mockBookings); // Use mock data
          setLoading(false);
        } else {
          const bookingsData = await fetchBookings(); // Fetch real data from API
          setBookings(bookingsData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        // Handle error (e.g., show error message, retry logic)
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Bookings List</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            Booking ID: {booking.id}, Property ID: {booking.propertyId}, User ID: {booking.userId}, Date: {booking.bookingDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;
