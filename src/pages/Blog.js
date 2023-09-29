import React, { useEffect, useState } from 'react';
import BlogPost from '../components/BlogPost';
import './Blog.css';
import axios from 'axios'; // Import Axios
import Result from './Result';

function Blog() {
  const [blogPosts, setBlogPosts] = useState([]); // State to hold the fetched blog posts

  useEffect(() => {
    // Inside useEffect to fetch data when the component mounts
    axios.get('http://localhost:3002/posts') // Replace with the actual API URL
      .then((response) => {
        setBlogPosts(response.data); // Set the fetched data in the state
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className="blog-page">
      <h2>Blog</h2>
      {blogPosts.map((post, index) => (
        <BlogPost key={index} title={post.title} content={post.content} />
      ))}
      <div className="result">
        <Result />
      </div>
    </div>
  );
}

export default Blog;
