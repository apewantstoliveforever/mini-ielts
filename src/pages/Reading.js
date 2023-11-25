import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Question from '../components/Question';
import './Reading.css'; // Import the CSS file
import api from '../api/api';
import CountdownTimer from '..//components/CountdownTimer/CountdownTimer';
import { useNavigate } from 'react-router-dom';

const Reading = () => {
    const { id } = useParams();
    const [post, setPost] = useState({});
    // const [selectedAnswers, setSelectedAnswers] = useState({


    // });
    //create selectedAnswers for every question in post if its not selected or input make it null
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [correctAnswers, setCorrectAnswers] = useState({});
    const [results, setResults] = useState([]);
    const [score, setScore] = useState(0);
    const api_url = api;
    const [showResult, setShowResult] = useState(false);
    const [restartTime, setRestartTime] = useState(false); // Add this line

    const navigate = useNavigate();

    const handleRestartTime = () => {
        setRestartTime(!restartTime);
    }

    const handleRestart = () => {
        setRestartTime(!restartTime); // Restart countdown timer
        setSelectedAnswers({}); // Reset selected answers
        setShowResult(false);
        setScore(0);
        setResults([]);
        resetAllChoose();
        resetAllBlankInput();
    }

    const resetAllChoose = () => {
        const allChoose = document.querySelectorAll('input[type="radio"]');
        allChoose.forEach((choose) => {
            choose.checked = false;
        });
    }
    const resetAllBlankInput = () => {
        const allBlankInput = document.querySelectorAll('input[type="text"]');
        allBlankInput.forEach((blankInput) => {
            blankInput.value = '';
        });
    }

    let currentQuestion = 1;

    function replaceUWithInput(text, currentQuestion) {
        const regex = /<u>(.*?)<\/u>/g;
        const fragments = text.split(regex); // Chia văn bản thành mảng các đoạn        
        // Thay thế các ký tự trong các đoạn thuộc cặp thẻ <u></u>
        for (let i = 1; i < fragments.length; i += 2) {
            fragments[i] = "this-is-blank-space";
        }
        return fragments
    }

    const a = "<p><span style=\"color: rgb(26, 26, 26);\">You may think you can’t live without your tablet computer and your cordless electric drill, but what about the inventions that came before them? Humans have been innovating since the dawn of time to get us to where we are today. Here are just 10 of the hundreds of inventions that profoundly changed your world. What else would be on your list?</span></p>"

    const removeTagP = (text) => {
        const modifiedA = text.replace(/<p>/g, "<span>");
        return modifiedA;
    }
    //const removeTagP = (text) => {
    //const modifiedA = text.replace(/<p>(.*?)<\/p>/g, '<span>$1</span>');
    //return modifiedA;
    //}

    console.log(removeTagP(a));



    const handleBlankInput = (e) => {
        const questionNumber = e.target.getAttribute('number');
        setSelectedAnswers({
            ...selectedAnswers,
            [questionNumber]: e.target.value,
        });
    }




    // Get data from API
    useEffect(() => {
        axios.get(`${api_url}/posts/${id}`)
            .then((response) => {
                const { data } = response;
                setPost(data);
            })
            .catch((error) => {
                console.error(`Error fetching data: ${error}`);
            });
    }, [id]);

    const getCorrectAnswers = () => {
        if (!post.sections) return {};
        const correctAnswers = {};
        let currentQuestion = 1;
        post.sections.forEach((section) => {
            section.questions.forEach((question) => {
                correctAnswers[currentQuestion] = question.question_answer;
                currentQuestion++;
            });
        })
        return correctAnswers;
    }

    const handleAnswerChange = (questionNumber, selectedOption) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionNumber]: selectedOption,
        });
    };

    const checkAnswer = () => {
        const correctAnswers = getCorrectAnswers();
        console.log("correctAnswers", correctAnswers);
        console.log("selectedAnswers", selectedAnswers);
        const results = Object.keys(correctAnswers).map((questionNumber) => {
            const correctAnswer = correctAnswers[questionNumber];
            const selectedAnswer = selectedAnswers[questionNumber];
            const isCorrect =
                Array.isArray(selectedAnswer) && Array.isArray(correctAnswer)
                    ? selectedAnswer.sort().toString() === correctAnswer.sort().toString()
                    : selectedAnswer === correctAnswer;

            return isCorrect;
        });
        setShowResult(true);
        setResults(results);
        setScore(results.filter((result) => result).length);
        // navigate('/result') and give results, correctAnswers, score;
        //save this post link
        const postLink = `/reading/${id}`;
        navigate(`/result/${id}`, { state: { results, correctAnswers, score, postLink, selectedAnswers } });
    };

    const checkTimeout = () => {
        checkAnswer();
    }


    useEffect(() => {
        console.log(selectedAnswers);
    }, [selectedAnswers]);

    useEffect(() => {
        setCorrectAnswers(getCorrectAnswers());
    }, [post]);

    return (
        <div className="reading-container">
            <div className='left-content'>
                <h1 className="post-title">{post.post_title}</h1>
                <div dangerouslySetInnerHTML={{ __html: post.reading_text }}></div>
            </div>
            <div className='right-content'>
                <div className="right-content">
                    <CountdownTimer checkTimeout={checkTimeout} restartTime={restartTime} handleRestartTime={handleRestartTime} />
                    {post.sections && post.sections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            {section.section_type === 'blank' ? (
                                <div>
                                    <div className='section-number'>
                                        SECTION {section.section_number}
                                    </div>
                                    <div className='section-title'>
                                        {section.section_title}
                                    </div>
                                    <div>
                                        {replaceUWithInput(removeTagP(section.section_detail), currentQuestion).map((fragment, fragmentIndex) => (
                                            <span key={fragmentIndex}>
                                                {fragment === 'this-is-blank-space' ? (
                                                    <input number={currentQuestion} type="text" onChange={handleBlankInput} placeholder={currentQuestion++} />
                                                ) : (
                                                    <span dangerouslySetInnerHTML={{ __html: fragment }}></span>
                                                )}
                                            </span>
                                        )
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className='section-number'>
                                        SECTION {section.section_number}
                                    </div>
                                    <div className='section-title'>
                                        {section.section_title}
                                    </div>
                                    <div dangerouslySetInnerHTML={{ __html: section.section_detail }}></div>
                                    {section.questions && section.questions.map((question, questionIndex) => (
                                        <div key={questionIndex}>
                                            <div className='question-number'>
                                                Question {currentQuestion++}
                                            </div>
                                            <Question
                                                number={questionIndex + 1} // Use questionIndex + 1 as the question number
                                                text={question.question_text}
                                                options={question.question_options}
                                                handleAnswerChange={handleAnswerChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    {
                        !showResult && (
                            <button onClick={checkAnswer}>Check Answer</button>
                        )
                    }
                    {
                        showResult && (
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
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Reading;

