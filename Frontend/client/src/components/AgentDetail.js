// src/components/AgentDetail.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await api.get(`/agents/${id}`);
        setAgent(response.data); // Assuming API response is a single agent object
      } catch (error) {
        console.error(`Error fetching agent with ID ${id}:`, error);
      }
    };

    fetchAgent();
  }, [id]);

  if (!agent) return <p>Loading agent details...</p>;

  return (
    <div>
      <h2>{agent.name}</h2>
      <p>Email: {agent.email}</p>
      {/* Add more agent details here */}
    </div>
  );
};

export default AgentDetail;
