import React, { useState, useEffect } from 'react';
import api from '../services/api';

const AgentForm = () => {
  const [agents, setAgents] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchAgents = async () => {
    try {
      const response = await api.get('/agents');
      setAgents(response.data);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleCreateAgent = async (e) => {
    e.preventDefault();
    try {
      await api.post('/agents', { name, email });
      await fetchAgents();
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error creating agent:', error);
    }
  };

  const handleDeleteAgent = async (id) => {
    try {
      await api.delete(`/agents/${id}`);
      await fetchAgents();
    } catch (error) {
      console.error(`Error deleting agent with ID ${id}:`, error);
    }
  };

  return (
    <div>
      <h2>Agent Form</h2>
      <form onSubmit={handleCreateAgent}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button type="submit">Create Agent</button>
      </form>
      <ul>
        {agents.map(agent => (
          <li key={agent.id}>
            {agent.name} - {agent.email}
            <button onClick={() => handleDeleteAgent(agent.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentForm;
