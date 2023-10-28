// Read.js
import React from 'react';
import Question from '../components/Question';

const Read = () => {
    return (
        <div>
            <h2>Read the following passage and answer the questions below:</h2>
            <p>
                [Insert your passage text here]
            </p>
            <h3>Questions 1-5</h3>
            <Question
                number="1"
                text="What is the main idea of the passage?"
                options={{
                    A: "The author's opinion on the topic",
                    B: "The author's opinion on the topic",
                    C: "The author's opinion on the topic",
                    D: "The author's opinion on the topic",
                }}
            />
            <Question
                number="2"
                text="Which of the following best describes the author's tone?"
                options={{
                    A: "The author's opinion on the topic",
                    B: "The author's opinion on the topic",
                    C: "The author's opinion on the topic",
                    D: "The author's opinion on the topic",
                }}
            />
            {/* Add more questions as needed */}
        </div>
    );
}

export default Read;
