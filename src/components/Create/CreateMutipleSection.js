import React, { useState, useEffect } from 'react';
import TextEditor from '../TextEditor/TextEditor';
import './CreateMutipleSection.css'

const CreateMutipleSection = ({ updateSection, index }) => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [sectionDetail, setSectionDetail] = useState('');
  const [sectionQuestions, setSectionQuestions] = useState([]);

  const readingTextChange = (value) => {
    setSectionDetail(value);
  }

  const addQuestion = () => {
    const newQuestion = {
      question_text: '',
      question_answer: 'A',
      question_options: {
        A: '',
        B: '',
        C: '',
        D: '',
      },
    };
    setSectionQuestions([...sectionQuestions, newQuestion]);
  }

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...sectionQuestions];
    list[index][name] = value;
    setSectionQuestions(list);
  }

  const handleOptionChange = (e, index, optionName) => {
    const { value } = e.target;
    const list = [...sectionQuestions];
    list[index].question_options[optionName] = value;
    setSectionQuestions(list);
  }

  const handleQuestionAnswerChange = (e, index) => {
    const { value } = e.target;
    const list = [...sectionQuestions];
    list[index].question_answer = value;
    setSectionQuestions(list);
  }

  const handleQuestionRemove = (index) => {
    const list = [...sectionQuestions];
    list.splice(index, 1);
    setSectionQuestions(list);
  }

  // Use useEffect to automatically update the section when there are changes
  useEffect(() => {
    const newSection = {
      section_type: 'multiple',
      section_title: sectionTitle,
      section_detail: sectionDetail,
      section_questions: sectionQuestions,
    };
    updateSection(index, newSection);
  }, [index, sectionTitle, sectionDetail, sectionQuestions]);

  return (
    <div>
      <h3>Create a Section</h3>
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
      <div>
        <button onClick={addQuestion}>Add Question</button>
      </div>
      {sectionQuestions.map((question, index) => (
        <div key={index}>
          <div>
            <label>Question Text:</label>
            <input type="text" name="question_text" value={question.question_text} onChange={(e) => handleQuestionChange(e, index)} />
          </div>
          <div>
            <label>Question Answer:</label>
            <select name="question_answer" value={question.question_answer} onChange={(e) => handleQuestionAnswerChange(e, index)}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
          <div>
            <label>Question Options:</label>
            <p>A</p><input type="text" name="A" value={question.question_options.A} onChange={(e) => handleOptionChange(e, index, "A")} />
            <p>B</p><input type="text" name="B" value={question.question_options.B} onChange={(e) => handleOptionChange(e, index, "B")} />
            <p>C</p><input type="text" name="C" value={question.question_options.C} onChange={(e) => handleOptionChange(e, index, "C")} />
            <p>D</p><input type="text" name="D" value={question.question_options.D} onChange={(e) => handleOptionChange(e, index, "D")} />
          </div>
          <div  className="remove-button">
            <button onClick={() => handleQuestionRemove(index)}>Remove Question</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateMutipleSection;
