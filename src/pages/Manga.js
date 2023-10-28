
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import './Manga.css';

const Manga = () => {
    //get params
    const { id } = useParams();
    const [chapters, setChapters] = useState([]); // State to hold the fetched blog post

    // get data from api
    useEffect(() => {
        axios.get(`https://api-blog.apewannaliveforever.online/manga/${id}`)
            .then((response) => {
                const { data } = response;
                setChapters(data);
                console.log(data);
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`);
            });
    },[])




    return (
<div className='manga-page'>
  Manga
  <div>
    {chapters.map((item, index) => (
      <div className='manga-item' key={index}>
        <span>
          <a href={`/manga/${id}/${item.chapter_id}`}>{item.chapter_title}</a>
        </span>
      </div>
    ))}
  </div>
</div>

    )
}

export default Manga