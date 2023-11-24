import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm/LoginForm';
import RegisterForm from '../components/RegisterForm/RegisterForm';
import Home from './Home';
import axios from 'axios';
import api from '../api/api';
// import authService from '../services/auth.service';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login, register } from '../actions/auth';


const Authenticate = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    const { isLoggedIn } = useSelector(state => state.auth);
    const { message } = useSelector(state => state.message);


    

    const handleLogin = async ({ email, password }) => {
        dispatch(login(email, password))
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                console.log('Login failed');
            });
    };

    const handleRegister = async ({ email, password, displayName, photoURL }) => {
        dispatch(register(email, password, displayName, photoURL))
            .then(() => {
                navigate('/');
            })
            .catch(() => {
                console.log('Register failed');
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
        <div>
            <>
                <LoginForm onLogin={handleLogin} />
                <RegisterForm onRegister={handleRegister} />
            </>
            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Authenticate;