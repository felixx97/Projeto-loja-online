import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/add-product">Add Product</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
