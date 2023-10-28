import React from 'react';

const Question = ({ number, text, selectedAnswer, handleAnswerChange, options }) => {
  const handleChange = (event) => {
    handleAnswerChange(number, event.target.value);
  };

  return (
    <div>
      <p>{text}</p>
      <form>
        {Object.keys(options).map((optionKey) => (
          <div key={optionKey}>
            <label>
              <input
                type="radio"
                name={`question${number}`}
                value={optionKey}
                onChange={handleChange}
              />
              {optionKey}: {options[optionKey]}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default Question;
