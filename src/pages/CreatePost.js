import React, { useState } from 'react';
import './CreatePost.css'; // Import your CSS file here
import TextEditor from './TextEditor';
import axios from 'axios';
import api from '../api/api';

function CreatePost() {
    const api_url = api
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'uploadimage');
        setLoading(true);
        axios.post(`${api_url}/posts/uploadImage`, data).then((res) => {
            setImage(res.data.secure_url);
            setLoading(false);
            console.log(res.data.secure_url);
        });
    };

    return (
        <div className="create-page">
            <h2>Đăng bài mới</h2>
            <div className="upload">
                <input
                    type="file"
                    name="file"
                    placeholder="Upload an image"
                    onChange={uploadImage}
                />
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <img src={image} style={{ width: '300px' }} alt="Uploaded" />
                )}
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setResult(image);
                        }}
                    >
                        Upload
                    </button>
                </div>
                <div className="result">
                    <img src={result} style={{ width: '300px' }} alt="Result" />
                </div>
                <div className='text-editor'>
                    <TextEditor />
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
