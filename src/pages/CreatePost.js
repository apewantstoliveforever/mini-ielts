// CreatePost.js
import React, { useState } from 'react';
import './CreatePost.css'; // Nhúng tệp CSS của bạn vào đây
import TextEditor from './TextEditor';



function CreatePost() {
    return (
        <div className='create-page'>
            <h2>Đăng bài mới</h2>
            <TextEditor />
        </div>
    );
}

export default CreatePost;
