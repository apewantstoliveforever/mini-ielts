import React from 'react';

const SelectQuestion = ({ number, text, options, handleAnswerChange }) => {
  const handleChange = (event) => {
    handleAnswerChange(number, event.target.value);
  };

  return (
    <div>
      <p>
        {number} {text}
      </p>
      <select name={`question${number}`} id={`question${number}`} onChange={handleChange}>
        <option value=""></option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectQuestion;
