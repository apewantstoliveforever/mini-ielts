import React, {useState} from 'react';
import { Container, Row, Col, Form, InputGroup, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

const StyledLoginForm = styled(Form)`
  width: 50%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
`;

const StyledInput = styled(FormControl)`
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // You might want to add some form validation here
    await onLogin({ email, password });
  };

  return (
    <Container>
      <Row>
        <Col md={6}>
          <StyledLoginForm>
            <h2>Login</h2>
            <InputGroup>
              <InputGroup.Text id="emailLabel">Email</InputGroup.Text>
              <StyledInput
                type="email"
                aria-label="Email"
                aria-describedby="emailLabel"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Text id="passwordLabel">Password</InputGroup.Text>
              <StyledInput
                type="password"
                aria-label="Password"
                aria-describedby="passwordLabel"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>

            <StyledButton variant="primary" onClick={handleLogin}>
              Login
            </StyledButton>
          </StyledLoginForm>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
