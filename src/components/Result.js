import axios from "axios";
import { useEffect, useState } from "react";
import api from "../api/api";

const Result = ({ content, id }) => {
  const api_url = api;
  // detele item list
  const Delete = (id) => {
    axios
      .delete(`${api_url}/posts/${id}`)
      .then(() => {

      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      <button onClick={() => Delete(id)}>Delete</button>
    </div>
  );
};

export default Result;