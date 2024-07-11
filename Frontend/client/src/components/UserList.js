// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function Users() {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5555/api/users')
//      .then(response => {
//         setUsers(response.data);
//       })
//      .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Users</h1>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             <a href={`/users/${user.id}`}>{user.name}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Users;











// // src/components/UserList.js

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const UserList = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await api.get('/users');
//         setUsers(response.data); // Assuming API response is an array of users
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div>
//       <h2>Users</h2>
//       <ul>
//         {users.map(user => (
//           <li key={user.id}>
//             <h3>{user.name}</h3>
//             <p>{user.email}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default UserList;


import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api'; // Import API function for fetching users
import mockUsers from '../mockData'; // Import mock users data

const useMockData = true; // Set to true during development or testing

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (useMockData) {
          setUsers(mockUsers); // Use mock data
          setLoading(false);
        } else {
          const usersData = await fetchUsers(); // Fetch real data from API
          setUsers(usersData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        // Handle error (e.g., show error message, retry logic)
        console.error('Error fetching users:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Users List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email} ({user.role})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
