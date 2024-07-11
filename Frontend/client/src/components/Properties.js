import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5555/api/properties')
     .then(response => {
        setProperties(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Properties</h1>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            <a href={`/properties/${property.id}`}>{property.address}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Properties;