import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import SyntaxHighlighter from "react-syntax-highlighter"; // Import SyntaxHighlighter
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"; // Import a code highlighting style
import api from "../../api/api";
const apiUrl = `${api}/posts`;

function TextEditor({readingTextChange}) {
  const [content, setContent] = useState("");
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

  const contentChange = (value) => {
    setContent(value);
    readingTextChange(value);
  }

  return (
    <form>
      <div>
      </div>
      <ReactQuill
        className="react-quill-container" // Thêm lớp CSS mới vào đây
        value={content}
        onChange={contentChange}
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
    </form>
  );
}

export default TextEditor;
