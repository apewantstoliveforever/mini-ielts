//ResultPage.js

import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


const ResultPage = ({}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { results, correctAnswers, score, postLink } = location.state;
    const handleRestart = () => {
        navigate(postLink);
    };

    return (
        <div>
            <h1>Result Page</h1>
            <div>
                <div className="question-results">
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                Question {index + 1}: {result ? 'Correct' : 'Incorrect'}
                                Correct answer: {correctAnswers[index + 1]}
                            </li>
                        ))}
                        {results.length > 0 && (
                            <p className="score">
                                Your score: {score} / {results.length}
                            </p>
                        )}
                    </ul>
                </div>

                <div className="button-container">
                    <button onClick={handleRestart}>Restart</button>
                </div>
            </div>
        </div>
    );
}

export default ResultPage;