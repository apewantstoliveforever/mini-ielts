import React, {useState} from 'react';
import { Container, Row, Col, Form, InputGroup, FormControl, FormLabel, Image, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledRegisterForm = styled(Form)`
  width: 70%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const StyledInput = styled(FormControl)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const StyledProfilePhoto = styled(Image)`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
`;

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
    <Container>
      <Row>
        <Col md={6}>
          <StyledRegisterForm>
            <h2>Register</h2>

            <FormLabel>Email</FormLabel>
            <InputGroup>
              <StyledInput
                type="email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <FormLabel>Password</FormLabel>
            <InputGroup>
              <StyledInput
                type="password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <FormLabel>Display Name</FormLabel>
            <StyledInput
              type="text"
              placeholder="Enter display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />

            <FormLabel>Profile Photo</FormLabel>
            <Form.Group>
              <Form.Control type="file" accept="image/*" onChange={handlePhotoChange} />
            </Form.Group>

            {photoURL && (
              <StyledProfilePhoto src={photoURL} alt="Profile Photo" />
            )}

            <StyledButton variant="primary" onClick={handleRegister}>
              Register
            </StyledButton>
          </StyledRegisterForm>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;