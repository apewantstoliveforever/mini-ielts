import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor/BlankTextEditor';

function extractTextFromHTML(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const uElements = doc.querySelectorAll('u'); // Select all <u> elements

    const textContents = Array.from(uElements).map(element => element.textContent);
    return textContents;
}


const CreateBlankSection = ({ updateSection, index }) => {
    const [sectionTitle, setSectionTitle] = useState('');
    const [sectionDetail, setSectionDetail] = useState('');
    const [sectionQuestions, setSectionQuestions] = useState([]);

    const readingTextChange = (value) => {
        setSectionDetail(value);

    }


    // Use useEffect to automatically update the section when there are changes
    useEffect(() => {
        const newSection = {
            section_type: 'blank',
            section_title: sectionTitle,
            section_detail: sectionDetail,
            section_questions: sectionQuestions,
        };
        updateSection(index, newSection);

    }, [sectionTitle, sectionDetail, sectionQuestions]);

    useEffect(() => {
        console.log(sectionQuestions);
    }, [sectionQuestions]);

    useEffect(() => {
        const qlSyntaxTexts = extractTextFromHTML(sectionDetail);
        const parsedQuestions = qlSyntaxTexts.map((text, index) => {
            return {
                question_text: "",
                question_answer: text, // Sử dụng nội dung từ qlSyntaxTexts
                question_number: (index + 1).toString(),
                question_options: {}
            };
        });
        setSectionQuestions(parsedQuestions); // Đặt giá trị của sectionQuestions thành mảng các đối tượng
    }, [sectionDetail]);

    return (
        <div>
            <h3>Blank Section</h3>
            <div>
                <label>Section Title:</label>
                <input type="text" value={sectionTitle} onChange={(e) => setSectionTitle(e.target.value)} />
            </div>
            <div>
                <label>Section Detail:</label>
                <div className='text-editor'>
                    <TextEditor readingTextChange={readingTextChange} />
                </div>
            </div>
        </div>
    );
};

export default CreateBlankSection;
