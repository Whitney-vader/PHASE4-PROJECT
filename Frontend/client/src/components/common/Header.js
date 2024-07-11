

import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/properties">Properties</Link></li>
          <li><Link to="/users">Users</Link></li>
          <li><Link to="/agents">Agents</Link></li>
          <li><Link to="/bookings">Bookings</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
