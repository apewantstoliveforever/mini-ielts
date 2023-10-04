import React from 'react';
import './Footer.css'; // Nhúng tệp CSS của bạn vào đây

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} My Personal Blog</p>
    </footer>
  );
}

export default Footer;
