import React, { useState, useEffect } from 'react';
import './ListenPosts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

function ListenPosts() {
  const api_url = api;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const navigate = useNavigate(); // Use navigate to redirect

  // Function to fetch manga items for a specific page
  function getPosts(pageNumber) {
    axios.get(`${api_url}/posts/listening/${pageNumber}`)
      .then((response) => {
        const { posts, totalPages } = response.data; // Response data should be accessed as response.data
        setPosts(posts);
        setTotalPages(totalPages);
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
        {posts.length > 0 ? (
          posts.map((item, index) => (
            <div className='manga-item' key={index} onClick={() => navigate(`/${item.post_type === 'reading' ? 'reading' : 'listen'}/${item.post_id}`)}>
              <div className='post-img'>
                <img src={"http://www.todayifoundout.com/wp-content/uploads/2014/01/salt3.jpg"} alt='Ảnh bài viết' />
              </div>
              <p>{item.post_title}</p>
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
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

export default ListenPosts;
