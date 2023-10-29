import React, { useState } from 'react';
import './CreatePost.css'; // Import your CSS file here
import TextEditor from '../components/TextEditor/TextEditor';
import axios from 'axios';
import api from '../api/api';

function CreatePost() {
    const api_url = 'http://localhost:3002';
    const [audio, setAudio] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const uploadAudio = async (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check if the selected file is an audio file
            if (file.type.startsWith('audio/')) {
                // Check if the file size is less than 10 MB
                if (file.size <= 10 * 1024 * 1024) {
                    const data = new FormData();
                    data.append('file', file);
                    setLoading(true);

                    axios.post(`${api_url}/posts/uploadAudio`, data).then((res) => {
                        setAudio(res.data.secure_url);
                        setLoading(false);
                        console.log(res.data.secure_url);
                    });
                } else {
                    alert('File size should be less than 10 MB.');
                }
            } else {
                alert('Please select an audio file.');
            }
        }
    };

    return (
        <div className="create-page">
            <h2>Đăng bài mới</h2>
            <div className="upload">
                <input
                    type="file"
                    accept="audio/*" // Accept only audio files
                    name="file"
                    placeholder="Upload an audio file"
                    onChange={uploadAudio}
                />
                {loading ? (
                    <h3>Loading...</h3>
                ) : (
                    <audio controls>
                        <source src={audio} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                )}
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setResult(audio);
                        }}
                    >
                        Upload
                    </button>
                </div>
                <div className="result">
                    <audio controls>
                        <source src={result} type="audio/mp3" />
                        Your browser does not support the audio element.
                    </audio>
                </div>
                <div className="text-editor">
                    <TextEditor />
                </div>
            </div>
        </div>
    );
}

export default CreatePost;
