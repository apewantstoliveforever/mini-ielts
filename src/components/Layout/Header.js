import React from 'react';
import './Header.css'; // Nhúng tệp CSS của bạn vào đây

function Header() {
  return (
    <header>
      <h1>My Personal Blog</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/about">About</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
