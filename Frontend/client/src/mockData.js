const properties = [
    { id: 1, address: '123 Main St', city: 'Anytown', state: 'CA', zipCode: '12345', price: 500000 },
    { id: 2, address: '456 Elm St', city: 'Othertown', state: 'NY', zipCode: '67890', price: 350000 },
    { id: 3, address: '789 Oak Ave', city: 'Smalltown', state: 'TX', zipCode: '54321', price: 250000 },
    { id: 4, address: '321 Pine Blvd', city: 'Bigtown', state: 'FL', zipCode: '98765', price: 600000 },
    // Add more properties
  ];
  
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'buyer' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'seller' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@example.com', role: 'agent' },
    { id: 4, name: 'Emily Brown', email: 'emily.brown@example.com', role: 'buyer' },
    // Add more users
  ];
  
  const bookings = [
    { id: 1, propertyId: 1, userId: 1, bookingDate: '2024-07-20' },
    { id: 2, propertyId: 2, userId: 2, bookingDate: '2024-07-22' },
    { id: 3, propertyId: 3, userId: 4, bookingDate: '2024-07-25' },
    // Add more bookings
  ];
  
  const agents = [
    { id: 1, name: 'Agent One', email: 'agent.one@example.com' },
    { id: 2, name: 'Agent Two', email: 'agent.two@example.com' },
    { id: 3, name: 'Agent Three', email: 'agent.three@example.com' },
    // Add more agents
  ];
  
  export { properties, users, bookings, agents };
  