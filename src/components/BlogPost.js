import React from 'react';
import './BlogPost.css'; // Nhúng tệp CSS của bạn vào đây
import Result from './Result'

function BlogPost({ title, content, id }) {
  return (
    <article className='article'>
      <h2 className='title'>{title}</h2>
      <div className="result">
        <Result content={content} id={id} />
      </div>
    </article>
  );
}

export default BlogPost;
