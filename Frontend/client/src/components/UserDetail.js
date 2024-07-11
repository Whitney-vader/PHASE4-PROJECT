import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDetail({ match }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5555/api/users/${match.params.id}`)
     .then(response => {
        setUser(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserDetail;