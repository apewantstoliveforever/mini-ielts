//component to display blank section
import React from "react";

const BlankSection = ({ section, handleAnswerChange, selectedAnswers }) => {

    const { questions, section_number } = section;

    return (
        <div className="section">
            <h3>Section {section_number}</h3>
            <div className="questions">
                {questions.map((question) => (
                    <BlankQuestion
                        key={question.question_number}
                        question={question}
                        handleAnswerChange={handleAnswerChange}
                        selectedAnswers={selectedAnswers}
                    />
                ))}
            </div>
        </div>
    );
};

export default BlankSection;