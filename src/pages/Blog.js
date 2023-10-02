import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams
import BlogPost from '../components/BlogPost';
import './Blog.css';
import axios from 'axios';
import api from '../api/api';

function Blog() {
  const { id } = useParams(); // Get the 'id' parameter from the URL
  const [blogPost, setBlogPost] = useState({}); // State to hold the fetched blog post
  const api_url = api
  useEffect(() => {
    // Inside useEffect to fetch data when the component mounts
    axios.get(`${api_url}/posts/${id}`)
      .then((response) => {
        setBlogPost(response.data); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]); // Include 'id' in the dependency array to re-run the effect when 'id' changes

  return (
    <div className="blog-page">
      <BlogPost title={blogPost.title} content={blogPost.content} id={blogPost.id} />
    </div>
  );
}

export default Blog;
