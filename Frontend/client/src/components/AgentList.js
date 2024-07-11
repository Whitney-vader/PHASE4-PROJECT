// // src/components/AgentList.js

// import React, { useState, useEffect } from 'react';
// import api from '../services/api';

// const AgentList = () => {
//   const [agents, setAgents] = useState([]);

//   useEffect(() => {
//     const fetchAgents = async () => {
//       try {
//         const response = await api.get('/agents');
//         setAgents(response.data); // Assuming API response is an array of agents
//       } catch (error) {
//         console.error('Error fetching agents:', error);
//       }
//     };

//     fetchAgents();
//   }, []);

//   return (
//     <div>
//       <h2>Agents</h2>
//       <ul>
//         {agents.map(agent => (
//           <li key={agent.id}>
//             <h3>{agent.name}</h3>
//             <p>{agent.email}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AgentList;


import React, { useState, useEffect } from 'react';
import { fetchAgents } from '../services/api'; // Import API function for fetching agents
import mockAgents from '../mockData'; // Import mock agents data

const useMockData = true; // Set to true during development or testing

const AgentList = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (useMockData) {
          setAgents(mockAgents); // Use mock data
          setLoading(false);
        } else {
          const agentsData = await fetchAgents(); // Fetch real data from API
          setAgents(agentsData);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        // Handle error (e.g., show error message, retry logic)
        console.error('Error fetching agents:', error);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Agents List</h2>
      <ul>
        {agents.map(agent => (
          <li key={agent.id}>
            {agent.name} - {agent.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AgentList;
