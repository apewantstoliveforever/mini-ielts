import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function Home() {
  const api_url = api;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const navigate = useNavigate(); // Use navigate to redirect

  // Function to fetch manga items for a specific page
  function getPosts(pageNumber) {
    axios.get(`https://api-blog.apewannaliveforever.online/manga/all/${pageNumber}`)
      .then((response) => {
        const { data } = response;
        setPosts(data.mangas);
        setTotalPages(data.totalPages);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }

  useEffect(() => {
    getPosts(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className='home-page'>
      <h2>Welcome to My Personal Blogs</h2>
      <p>This is the home page.</p>
      <div className='manga-list'>
        {posts.map((item, index) => (
          <div className='manga-item' key={index} onClick={() => navigate(`/manga/${item.manga_id}`)}>
            <div className='post-img'>
              <img src='item.manga_image' alt='Ảnh bài viết' />
            </div>
            <p>{item.manga_name}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
