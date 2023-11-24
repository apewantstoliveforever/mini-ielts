import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateMutipleSection from '../components/Create/CreateMutipleSection';
import CreateSelectSection from '../components/Create/CreateSelectSection';
import CreateBlankSection from '../components/Create/CreateBlankSection';
import TextEditor from '../components/TextEditor/TextEditor';
import api from '../api/api';
import './Create.css'; // Import the CSS file
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserService from "../services/user.service"





const NotificationMessage = ({ message, onDismiss }) => {
    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <div className="notification-message">
            <div className="notification-content">{message}</div>
            <div className="notification-actions">
                <Link to="/" className="navigation-link">
                    <button>Go to Home Page</button>
                </Link>
                <button onClick={refreshPage}>Create New Post</button>
            </div>
        </div>
    );
};

const Create = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postType, setPostType] = useState('listen');
    const [readingText, setReadingText] = useState('');
    const [listeningLink, setListeningLink] = useState('');
    const [sections, setSections] = useState([]);
    const [sectionType, setSectionType] = useState('multiple'); // Add state for sectionType

    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [audio, setAudio] = useState('');

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const api_url = api;
    const navigate = useNavigate(); // Use navigate to redirect

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }



    const renderSectionForm = ({ index, key, section }) => {
        const sectionType = section.section_type;
        switch (sectionType) {
            case 'multiple':
                return <CreateMutipleSection updateSection={updateSection} index={index} />;
            case 'blank':
                return <CreateBlankSection updateSection={updateSection} index={index} />;
            //case 'select':
            //return <CreateSelectSection updateSection={updateSection} index={index} />;
            default:
                return null;
        }
    };

    const readingTextChange = (value) => {
        setReadingText(value);
    }

    const uploadAudio = async (e) => {
        const file = e.target.files[0];

        if (file) {
            // Check if the selected file is an audio file
            if (file.type.startsWith('audio/')) {
                // Check if the file size is less than 10 MB
                if (file.size <= 10 * 1024 * 1024) {
                    setAudio(file)
                };
            } else {
                alert('File size should be less than 10 MB.');
            }
        } else {
            alert('Please select an audio file.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (postType === 'listen') {
                if (audio === '') {
                    alert('Please select an audio file.');
                } else {
                    const data = new FormData();
                    data.append('file', audio);
                    const jsonData = {
                        key1: 'value1',
                        key2: 'value2'
                        // Add your JSON data here
                    };
                    // Add JSON data to FormData
                    data.append('post_title', postTitle);

                    axios({
                        method: 'POST',
                        url: `${api_url}/posts/uploadAudio`,
                        data: data, // Attach the FormData object
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    }).then(async (res) => {
                        //neu status 200 thi upload thanh cong
                        console.log(res.status);
                        setListeningLink(res.data.linkId);
                        if (res.status === 200) {
                            const dataSend = {
                                post_title: postTitle,
                                post_type: postType,
                                reading_text: readingText,
                                listening_link: res.data.linkId,
                                post_sections: sections,
                            };
                            const response = await axios.post(`${api_url}/posts`, dataSend);
                        }
                    }).catch((error) => {
                        console.error('Error:', error);
                    });
                }


            }

            else {
                const dataSend = {
                    post_title: postTitle,
                    post_type: postType,
                    reading_text: readingText,
                    listening_link: listeningLink,
                    post_sections: sections,
                };

                // const response = await axios.post(`${api_url}/posts`, dataSend);
                // console.log(dataSend);
                UserService.postNewReading(dataSend).then(
                    (response) => {
                        console.log(response.data);
                        setNotificationMessage('Post created successfully!');
                        setShowNotification(true);
                    },
                    (error) => {
                        console.log(error);
                    }
                );

            }

            // // Post creation successful
            // setNotificationMessage('Post created successfully!');
            // setShowNotification(true);
        } catch (error) {
            console.error('Error creating post:', error);

            // Post creation failed
            setNotificationMessage('Error creating post. Please try again.');
            setShowNotification(true);
        }
    };


    const addSection = () => {
        const newSection = {
            section_type: sectionType,
            section_title: '',
            section_detail: '',
            section_question: [],
        };
        setSections([...sections, newSection]);
    };

    const onUpdateSection = (key, value) => {
        setSectionType(value);
    };

    const updateSection = (index, value) => {
        const newSections = [...sections];
        newSections[index] = value;
        setSections(newSections);
    };

    const removeSection = (index) => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
    };

    // useEffect(() => {
    //     console.log(sections);
    // }, [sections]);


    return (
        <div className="create-container">
            <div>
                <div>
                    <h2>Create a Post</h2>
                    <form className="create-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Title:</label>
                            <input type="text" value={postTitle} onChange={(e) => setPostTitle(e.target.value)} />
                        </div>
                        <div>
                            <label>Type:</label>
                            <select value={postType} onChange={(e) => setPostType(e.target.value)}>
                                <option value="listen">Listen</option>
                                <option value="reading">Reading</option>
                            </select>
                        </div>
                        {postType === 'reading' && (
                            <div className='text-editor'>
                                <TextEditor readingTextChange={readingTextChange} />
                            </div>
                        )}
                        {postType === 'listen' && (
                            <div>
                                <label>Listening Link:</label>
                                <input
                                    type="file"
                                    accept="audio/*" // Accept only audio files
                                    name="file"
                                    placeholder="Upload an audio file"
                                    onChange={uploadAudio}
                                />
                            </div>
                        )}
                    </form>
                </div>
                {sections.map((section, index) => (
                    <div key={index} className="create-section">
                        {renderSectionForm({ index, section })}
                        <div className='remove-button'>
                            <button onClick={() => removeSection(index)}>Remove Section</button>
                        </div>
                    </div>
                ))}
                <select
                    className="create-section-select"
                    value={sectionType}
                    onChange={(e) => onUpdateSection('sectionType', e.target.value)}
                >
                    <option value="multiple">Multiple Section</option>
                    <option value="blank">Blank Section</option>
                    {/* <option value="select">Select Section</option> */}
                </select>
                <button className="create-section-button" onClick={addSection}>Add Section</button>
            </div>
            <button onClick={handleSubmit} className="create-post-button">Create Post</button>
            {showNotification && (
                <NotificationMessage
                    message={notificationMessage}
                    onDismiss={() => setShowNotification(false)}
                />
            )}
        </div>
    );
}

export default Create;
