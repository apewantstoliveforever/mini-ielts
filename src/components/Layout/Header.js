import React from 'react';
import './Header.css'; // Nhúng tệp CSS của bạn vào đây

function Header() {
  return (
    <header>
      <h1>My Personal Blog</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/listening">Listen</a></li>
          <li><a href="/reading">Reading</a></li>
          <li><a href="/create">Create</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
