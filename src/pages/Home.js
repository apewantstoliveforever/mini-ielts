import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; 

function Home() {
  const api_url = api
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Use navigate to redirect
  // Lấy danh sách bài viết
  function getPosts() {
    axios.get(`${api_url}/posts`)
      .then((response) => {
        const { data } = response;
        setPosts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }
  
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='home-page'>
      <h2>Welcome to My Personal Blogs</h2>
      <p>This is the home page.</p>
      <div className='post-list'>
        {
          posts.map((post, index) => (
            <div
              className='post-item'
              key={index}
              onClick={() => navigate(`/blog/${post.id}`)} // Use navigate to redirect
            >
              <div className='post-img'>
                <img src='https://picsum.photos/200/300' alt='Ảnh bài viết' />
              </div>
              <div className='post-content'>
                <h3>{post.title}</h3>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
