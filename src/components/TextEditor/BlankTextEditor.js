import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import api from "../../api/api";

const apiUrl = `${api}/posts`;

function TextEditor({ readingTextChange }) {
  const [content, setContent] = useState("");
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: ['9', '10', '11', '12', '13', '16', '20', '30'] }, { size: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ["bold", "italic", "underline"],
      ["link", "image"],
      ["clean"],
      // Add a custom button to change text color to red
      [{ 'color': ['#000', 'orange'] }],
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
    "code-block",
    "color"
  ];

  const contentChange = (value) => {
    setContent(value);
    readingTextChange(value);
  }

  return (
    <form>
      <ReactQuill
        className="react-quill-container"
        value={content}
        onChange={contentChange}
        modules={modules}
        formats={formats}
        placeholder="Write something..."
        renderCustomComponent={(props) => (
          <SyntaxHighlighter language="javascript" style={docco}>
            {props.children}
          </SyntaxHighlighter>
        )}
      />
    </form>
  );
}

export default TextEditor;
