import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Table, TableToolbar } from '@ckeditor/ckeditor5-table';
import axios from "axios";
const apiUrl = 'http://localhost:3002/posts'; // Điều chỉnh URL của bạn tại đây


function TextEditor() {
  const [title, setTitle] = useState(""); // State for the title
  const [textEditor, setTextEditor] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: title, // Add the title to the data object
      content: textEditor,
    };

    axios
      .post(apiUrl, data)
      .then(() => {
        // Clear the title and textEditor fields after successful submission
        setTitle("");
        setTextEditor("");
      })
      .catch((err) => console.log(err));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <CKEditor
        editor={ClassicEditor}
        data={textEditor}
        onReady={(editor) => {
          // You can store the "editor" and use it when needed.
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setTextEditor(data);
        }}
        plugins={[Table, TableToolbar]}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TextEditor;
