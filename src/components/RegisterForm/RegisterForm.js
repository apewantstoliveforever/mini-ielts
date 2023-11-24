// RegisterForm.js
import React, { useState } from 'react';

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  const handleRegister = async () => {
    // You might want to add some form validation here
    await onRegister({ email, password, displayName, photoURL });
  };

  const handlePhotoChange = (e) => {
    // Access the first file from the selected files
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      const reader = new FileReader();
  
      reader.onloadend = () => {
        // The result property contains the base64 data URL
        const base64Photo = reader.result;
        setPhotoURL(base64Photo);
      };
  
      // Read the file as a data URL
      reader.readAsDataURL(selectedPhoto);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Display Name"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handlePhotoChange}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegisterForm;
