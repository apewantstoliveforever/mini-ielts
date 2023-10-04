// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import CreatePost from './pages/CreatePost';
import Manga from './pages/Manga';
import Chapter from './components/Chapter/Chapter';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/manga/:id" element={<Manga />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/manga/:id/:chapter" element={<Chapter />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
