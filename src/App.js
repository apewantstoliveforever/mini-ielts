// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Manga from './pages/Manga';
import Chapter from './components/Chapter/Chapter';
import Listen from './pages/Listen';
import Read from './pages/Read';
import NewIelts from './pages/NewIelts';
import Create from './pages/Create';
import Reading from './pages/Reading';
import ListenPosts from './pages/ListenPosts';
import ReadPosts from './pages/ReadPosts';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/manga/:id" element={<Manga />} />
          <Route path="/manga" element={<Manga />} />
          <Route path="/manga/:id/:chapter" element={<Chapter />} />
          <Route path="/read" element={<Read />} />
          <Route path='/new-ielts' element={<NewIelts />} />
          <Route path='/create' element={<Create />} />
          <Route path='/reading/:id' element={<Reading />} />
          <Route path="/listen/:id" element={<Listen />} />
          <Route path="/listening" element={<ListenPosts />} />
          <Route path="/reading" element={<ReadPosts />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
