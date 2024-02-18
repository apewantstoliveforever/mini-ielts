// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Listen from './pages/Listen';
import Read from './pages/Read';
import NewIelts from './pages/NewIelts';
import Create from './pages/Create';
import Reading from './pages/Reading';
import ListenPosts from './pages/ListenPosts';
import ReadPosts from './pages/ReadPosts';
import Authenticate from './pages/Authenticate';
import './App.css';
import Profile from './pages/Profile';
import ResultPage from './pages/ResultPage';
import Traffic from './pages/Traffic';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/read" element={<Read />} />
          <Route path='/new-ielts' element={<NewIelts />} />
          <Route path='/create' element={<Create />} />
          <Route path='/reading/:id' element={<Reading />} />
          <Route path="/listen/:id" element={<Listen />} />
          <Route path="/listening" element={<ListenPosts />} />
          <Route path="/reading" element={<ReadPosts />} />
          <Route path="/authenticate" element={<Authenticate />} />
          <Route path= "/profile" element={<Profile />} />
          <Route path="/login" element={<Authenticate />} />
          <Route path="/result/:id" element={<ResultPage />} />
          <Route path="/traffic" element={<Traffic />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
