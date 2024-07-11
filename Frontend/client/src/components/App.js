import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Properties from './Properties';
import PropertyDetail from './PropertyDetail';
import Users from './Users';
import UserDetail from './UserDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;