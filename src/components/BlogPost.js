import React from 'react';
import './BlogPost.css'; // Nhúng tệp CSS của bạn vào đây

function BlogPost({ title, content }) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{content}</p>
    </article>
  );
}

export default BlogPost;
