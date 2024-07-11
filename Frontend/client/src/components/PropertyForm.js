import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PropertyForm = () => {
  const [properties, setProperties] = useState([]);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const fetchProperties = async () => {
    try {
      const response = await api.get('/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleCreateProperty = async (e) => {
    e.preventDefault();
    try {
      await api.post('/properties', { address, city, state, zipCode, price, description });
      await fetchProperties();
      setAddress('');
      setCity('');
      setState('');
      setZipCode('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  const handleDeleteProperty = async (id) => {
    try {
      await api.delete(`/properties/${id}`);
      await fetchProperties();
    } catch (error) {
      console.error(`Error deleting property with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <h2>Property Form</h2>
      <form onSubmit={handleCreateProperty}>
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
        <input type="text" placeholder="Zip Code" value={zipCode} onChange={(e) => setZipCode(e.target.value)} required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
        <button type="submit">Create Property</button>
      </form>
      <ul>
        {properties.map(property => (
          <li key={property.id}>
            {property.address} - {property.city} - ${property.price}
            <button onClick={() => handleDeleteProperty(property.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PropertyForm;
