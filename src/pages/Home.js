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
    axios.get("http://localhost:3002/manga/all")
      .then((response) => {
        const { data } = response;
        setPosts(data);
        console.log(data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }
  const fakeData = [{
    id: "pkfa8iLO",
    name: "one piece",
    number_chapter: 30,
  },
  {
    id: "0xKFumO8",
    name: "naruto",
    number_chapter: 20
  },
  {
    id: 3,
    number_chapter: 23
  },
  {
    id: 4,
    name: "naruto",
    number_chapter: 20
  },
  {
    id: 5,
    number_chapter: 23
  }
  ]

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className='home-page'>
      <h2>Welcome to My Personal Blogs</h2>
      <p>This is the home page.</p>
      <div className='manga-list'>
        {
          posts.map((item, index) => (
            <div className='manga-item' key={index} onClick={() => navigate(`/manga/${item.manga_id}`)}>
              <div className='post-img'>
                <img src='https://picsum.photos/200/300' alt='Ảnh bài viết' />
              </div>
              <p>{item.manga_name}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
