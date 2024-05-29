import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useSelector } from "react-redux";
import UserService from "../services/user.service"


function Home() {
  const api_url = api;
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Current page
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const navigate = useNavigate(); // Use navigate to redirect
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.role;
    }
    return null;
  };
  const userRole = getUserRole();
  // Function to fetch manga items for a specific page
  function getPosts(pageNumber) {
    axios.get(`${api_url}/posts/page/${pageNumber}`)
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

  useEffect(() => {
    console.log(import.meta.env.REACT_APP_API_URL);
  },[]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
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

  return (
    <div className='home-page'>
      <div className="pagination">
        <button className="pagination-btn" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>Previous</button>
        <span className="pagination-info">Page {page} of {totalPages}</span>
        <button className="pagination-btn" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>Next</button>
      </div>
      <div className='manga-list'>
        {posts.length > 0 ? (
          posts.map((item, index) => (
            <div className='manga-item' key={index}>
              <div onClick={() => navigate(`/${item.post_type === 'reading' ? 'reading' : 'listen'}/${item.post_id}`)}>
                <div className='post-img'>
                  <img src={extractImageSrcFromHTML(item.reading_text)} alt='Ảnh bài viết' />
                </div>
                <p>{item.post_title}</p>
              </div>
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

export default Home;
