import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PropertyDetail({ match }) {
  const [property, setProperty] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:5555/api/properties/${match.params.id}`)
     .then(response => {
        setProperty(response.data);
      })
     .catch(error => {
        console.error(error);
      });
  }, [match.params.id]);

  return (
    <div>
      <h1>{property.address}</h1>
      <p>City: {property.city}</p>
      <p>State: {property.state}</p>
      <p>Zip Code: {property.zip_code}</p>
      <p>Price: {property.price}</p>
      <p>Description: {property.description}</p>
    </div>
  );
}

export default PropertyDetail;