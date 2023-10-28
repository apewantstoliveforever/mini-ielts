import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Chapter.css';

const Chapter = () => {
    //get params
    const { chapter} = useParams();
    const [content, setContent] = useState(""); // State to hold the fetched blog post
    useEffect(() => {
        axios.get(`https://api-blog.apewannaliveforever.online/manga/chapter/${chapter}`)
            .then((response) => {
                const { data } = response;
                setContent(data.chapter_content);
                console.log(data);
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`);
            });
    }, [])
    return (
        <div className="reading">
            <div dangerouslySetInnerHTML={{ __html: content }}></div>
        |</div>
    )
}

export default Chapter