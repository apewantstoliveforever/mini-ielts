//ResultPage.js

import React, { Component } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './ResultPage.css';


ChartJS.register(ArcElement, Tooltip, Legend);


const ResultPage = ({ }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { results, correctAnswers, postLink, selectedAnswers } = location.state;
    const handleRestart = () => {
        navigate(postLink);
    };
    //lengh of selectedAnswers = {}
    const selectedAnswersLength = Object.keys(selectedAnswers).length
    console.log("sss", Object.keys(selectedAnswers));
    const notAnswered = results.length - selectedAnswersLength;
    //const inCorrectAnswers = results.filter((result) => result === false).length - notAnswered;
    const score = results.filter((result) => result === true).length;
    const inCorrectAnswers = results.length - score - notAnswered;
    console.log(results);
    console.log('score', score);
    console.log(inCorrectAnswers);
    console.log("not answer", notAnswered);
    console.log(selectedAnswersLength);

    const data = {
        labels: ['Correct', 'Incorrect', 'Not Answered'],
        datasets: [
            {
                label: '# of Votes',
                data: [score, inCorrectAnswers, notAnswered],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="result-page-container">
            <h1>Result Page</h1>
            <div className="result-content">
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
                <div className="chart-container">
                    <Pie data={data} />
                </div>
            </div>
        </div>
    );
}

export default ResultPage;