import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login, register } from '../actions/auth';
import './Authenticate.css';

const Authenticate = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);
  const [showLogin, setShowLogin] = useState(null);
  const [showRegister, setShowRegister] = useState(null);
  const [activeTab, setActiveTab] = useState('login');

  const handleLogin = async ({ email, password }) => {
    setShowLogin(false);
    setShowRegister(false);
    dispatch(login(email, password))
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Login failed', error);
        setShowLogin(true);
      });
  };

  const handleRegister = async ({ email, password, displayName, photoURL }) => {
    setShowLogin(false);
    setShowRegister(false);
    dispatch(register(email, password, displayName, photoURL))
      .then(() => {
        navigate('/');
      })
      .catch(error => {
        console.error('Register failed', error);
        setShowRegister(true);
      });
  };

  useEffect(() => {
    console.log('user:', user);
    console.log('token:', token);
  }, [user, token]);

  if (isLoggedIn) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="AuthenticatePage">
      <div className="tab-container">
        <div
          className={`tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </div>
        <div
          className={`tab ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </div>
      </div>
      {activeTab === 'login' && (
        <div className="login-form">
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
      {activeTab === 'register' && (
        <div className="register-form">
          <RegisterForm onRegister={handleRegister} />
        </div>
      )}
      {showLogin && message && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                Lỗi đăng nhập
              </div>
            </div>
            <button className="modal-close" onClick={() => setShowLogin(false)}>
              X
            </button>
          </div>
        </div>
      )}
      {showRegister && message && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                Lỗi đăng ký
              </div>
            </div>
            <button className="modal-close" onClick={() => setShowRegister(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authenticate;
