import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SyntaxHighlighter from "react-syntax-highlighter"; // Import SyntaxHighlighter
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Import a code highlighting style

const apiUrl = "http://localhost:3002/posts";

function TextEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const data = {
      title: title,
      content: content,
    };

    axios
      .post(apiUrl, data)
      .then(() => {
        setTitle("");
        setContent("");
      })
      .catch((err) => console.log(err));
  }

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: ['9','10','11','12','13','16','20','30'] }, { size: [] }, {color: []}],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      ["clean"],
      ["code-block"], // Add the code block button
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "list",
    "bold",
    "italic",
    "underline",
    'align',
    "link",
    "image",
    "code-block", // Add the code block format
    "color"
  ];

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
      <ReactQuill
        className="react-quill-container" // Thêm lớp CSS mới vào đây
        value={content}
        onChange={setContent}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        // Custom renderer for code block
        // This renderer uses SyntaxHighlighter to highlight code
        renderCustomComponent={(props) => (
          <SyntaxHighlighter language="javascript" style={docco}>
            {props.children}
          </SyntaxHighlighter>
        )}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TextEditor;
