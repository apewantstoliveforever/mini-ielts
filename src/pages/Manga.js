
import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

const Manga = () => {
    //get params
    const { id } = useParams();
    const [chapters, setChapters] = useState([]); // State to hold the fetched blog post

    // get data from api
    useEffect(() => {
        axios.get(`http://localhost:3002/manga/${id}`)
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
<div>
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