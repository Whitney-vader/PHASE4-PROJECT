// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function PropertyDetail({ match }) {
//   const [property, setProperty] = useState({});

//   useEffect(() => {
//     axios.get(`http://localhost:5555/api/properties/${match.params.id}`)
//      .then(response => {
//         setProperty(response.data);
//       })
//      .catch(error => {
//         console.error(error);
//       });
//   }, [match.params.id]);

//   return (
//     <div>
//       <h1>{property.address}</h1>
//       <p>City: {property.city}</p>
//       <p>State: {property.state}</p>
//       <p>Zip Code: {property.zip_code}</p>
//       <p>Price: {property.price}</p>
//       <p>Description: {property.description}</p>
//     </div>
//   );
// }

// export default PropertyDetail;

// src/components/PropertyDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const PropertyDetail = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data); // Assuming API response is a single property object
      } catch (error) {
        console.error(`Error fetching property with ID ${id}:`, error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading property details...</p>;

  return (
    <div>
      <h2>{property.address}</h2>
      <p>{property.description}</p>
      {/* Add more property details here */}
    </div>
  );
};

export default PropertyDetail;
