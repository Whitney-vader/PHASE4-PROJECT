// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// function Properties() {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:5555/api/properties')
//      .then(response => {
//         setProperties(response.data);
//       })
//      .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Properties</h1>
//       <ul>
//         {properties.map(property => (
//           <li key={property.id}>
//             <a href={`/properties/${property.id}`}>{property.address}</a>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Properties;










// src/components/PropertyList.js

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const PropertyList = () => {
//   const [properties, setProperties] = useState([]);

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await api.get('/properties');
//         setProperties(response.data); // Assuming API response is an array of properties
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//       }
//     };

//     fetchProperties();
//   }, []);

//   return (
//     <div>
//       <h2>Properties</h2>
//       <ul>
//         {properties.map(property => (
//           <li key={property.id}>
//             <h3>{property.address}</h3>
//             <p>{property.description}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PropertyList;



import React, { useState, useEffect } from 'react';
import { fetchProperties } from '../services/api';
import mockProperties from '../mockData'; // Import mock data

const useMockData = true; // Set this to true during development or testing

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (useMockData) {
          setProperties(mockProperties); // Use mock data
          setLoading(false);
        } else {
          const propertiesData = await fetchProperties(); // Fetch real data from API
          setProperties(propertiesData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        // Handle error (e.g., show error message, retry logic)
        console.error('Error fetching properties:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Properties List</h2>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            {property.address}, {property.city}, {property.state} - ${property.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyList;
