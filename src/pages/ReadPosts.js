import React, { useState, useEffect } from 'react';
import './ReadPosts.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import UserService from "../services/user.service"

function ReadPosts() {
  const api_url = api;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const navigate = useNavigate(); // Use navigate to redirect

  // Function to fetch manga items for a specific page
  function getPosts(pageNumber) {
    axios.get(`${api_url}/posts/reading/${pageNumber}`)
      .then((response) => {
        const { posts, totalPages } = response.data; // Response data should be accessed as response.data
        setPosts(posts);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }

  function extractImageSrcFromHTML(htmlContent) {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = htmlContent;

    const imgElement = tempElement.querySelector('img');
    const src = imgElement ? imgElement.getAttribute('src') : "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png";

    return src;
  }
  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.role;
    }
    return null;
  };
  const userRole = getUserRole();
  const handleDelete = (id) => {
    UserService.deletePost(id).then(
      (response) => {
        console.log(response);
        getPosts(page);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  useEffect(() => {
    getPosts(page);
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className='home-page'>
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
      <div className='manga-list'>
        {posts.length > 0 ? (
          posts.map((item, index) => (
            <div className='manga-item' key={index} onClick={() => navigate(`/${item.post_type === 'reading' ? 'reading' : 'listen'}/${item.post_id}`)}>
              <div className='post-img'>
                <img src={extractImageSrcFromHTML(item.reading_text)} alt='Ảnh bài viết' />
              </div>
              <p>{item.post_title}</p>
              {userRole === 'admin' &&
                <button onClick={() => handleDelete(item.post_id)} className='btn btn-primary'>Delete</button>
              }
            </div>
          ))
        ) : (
          <p>No posts available.</p>
        )}
      </div>
    </div>
  );
}

export default ReadPosts;
