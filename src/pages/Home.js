import React from 'react';
import './Home.css'; // Nhúng tệp CSS của bạn vào đây
function Home() {
  const fakePosts = [
    {
      title: 'Bài viết 1',
      content: 'Nội dung bài viết 1',
      img: 'https://picsum.photos/200/300',
    },
    {
      title: 'Bài viết 2',
      content: 'Nội dung bài viết 2',
      img: 'https://picsum.photos/200/300',
    },
    {
      title: 'Bài viết 3',
      content: 'Nội dung bài viết 3',
      img: 'https://picsum.photos/200/300',
    },
    {
      title: 'Bài viết 4',
      content: 'Nội dung bài viết 4',
      img: 'https://picsum.photos/200/300',
    },
    
    {
      title: 'Bài viết 3',
      content: 'Nội dung bài viết 3',
      img: 'https://picsum.photos/200/300',
    },
    {
      title: 'Bài viết 4',
      content: 'Nội dung bài viết 4',
      img: 'https://picsum.photos/200/300',
    }
  ];
  return (
    <div className='home-page'>
      <h2>Welcome to My Personal Blog</h2>
      <p>This is the home page.</p>
      <div className='post-list'>
        {
          fakePosts.map((post, index) => (
            <div className='post-item' key={index}>
              <div className='post-img'>
                <img src={post.img} alt='Ảnh bài viết' />
              </div>
              <div className='post-content'>
                <h3>{post.title}</h3>
                <p>{post.content}</p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Home;
