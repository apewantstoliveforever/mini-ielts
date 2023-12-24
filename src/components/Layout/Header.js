import React from 'react';
import './Header.css'; // Nhúng tệp CSS của bạn vào đây
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { login, register, logout } from '../../actions/auth';
import {getUserRole} from '../../services/user-role'

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //get isLoggedIn from store
  const { isLoggedIn } = useSelector(state => state.auth);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  return (
    <header>
      <h1>Mini Toeic</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          {isLoggedIn && (
            <li><a href="/profile">Profile</a></li>
          )}
          {isLoggedIn && getUserRole === 'admin' && (
            <li><a href="/create">Create</a></li>

          )}
          <li><a href="/listening">Listen</a></li>
          <li><a href="/reading">Reading</a></li>
          {isLoggedIn ? (
            <li><a href="/login" onClick={handleLogout}>Logout</a></li>
          ) : (
            <li><a href="/login">Login</a></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
