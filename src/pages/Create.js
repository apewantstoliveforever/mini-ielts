import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateMutipleSection from '../components/Create/CreateMutipleSection';
import CreateSelectSection from '../components/Create/CreateSelectSection';
import CreateBlankSection from '../components/Create/CreateBlankSection';
import TextEditor from '../components/TextEditor/TextEditor';
import api from '../api/api';
import './Create.css'; // Import the CSS file

const Create = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postType, setPostType] = useState('listen');
    const [readingText, setReadingText] = useState('');
    const [listeningLink, setListeningLink] = useState('');
    const [sections, setSections] = useState([]);
    const [sectionType, setSectionType] = useState('multiple'); // Add state for sectionType

    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const api_url = api;

    const renderSectionForm = ({ index, key, section }) => {
        const sectionType = section.section_type;
        switch (sectionType) {
            case 'multiple':
                return <CreateMutipleSection updateSection={updateSection} index={index} />;
            case 'blank':
                return <CreateBlankSection updateSection={updateSection}  index={index} />;
            case 'select':
                return <CreateSelectSection updateSection={updateSection}  index={index} />;
            default:
                return null;
        }
    };

    const readingTextChange = (value) => {
        setReadingText(value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const dataSend = {
                post_title: postTitle,
                post_type: postType,
                reading_text: readingText,
                listening_link: listeningLink,
                post_sections: sections,
            };

            const response = await axios.post(`${api_url}/posts`, dataSend);
            console.log(dataSend);
        } catch (error) {
            console.error('Error creating post:', error);
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

    useEffect(() => {
        console.log(sections);
    }, [sections]);


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
                                <input type="text" value={listeningLink} onChange={(e) => setListeningLink(e.target.value)} />
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
                    <option value="select">Select Section</option>
                </select>
                <button className="create-section-button" onClick={addSection}>Add Section</button>
            </div>
            <button onClick={handleSubmit} className="create-post-button">Create Post</button>
        </div>
    );
}

export default Create;
