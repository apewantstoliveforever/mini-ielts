import React from 'react';
import './Footer.css'; // Nhúng tệp CSS của bạn vào đây

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Mini Toeic</p>
    </footer>
  );
}

export default Footer;
