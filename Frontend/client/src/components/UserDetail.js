// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function UserDetail({ match }) {
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     axios.get(`http://localhost:5555/api/users/${match.params.id}`)
//      .then(response => {
//         setUser(response.data);
//       })
//      .catch(error => {
//         console.error(error);
//       });
//   }, [match.params.id]);

//   return (
//     <div>
//       <h1>{user.name}</h1>
//       <p>Email: {user.email}</p>
//     </div>
//   );
// }

// export default UserDetail;

// src/components/UserDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data); // Assuming API response is a single user object
      } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) return <p>Loading user details...</p>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
      {/* Add more user details here */}
    </div>
  );
};

export default UserDetail;
