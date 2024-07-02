import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {


  return (
    <div className="topnav">
      <Link to="/"> Logout</Link>
      <Link to="/home">Home</Link>
    </div>
  );
};

export default Header;
