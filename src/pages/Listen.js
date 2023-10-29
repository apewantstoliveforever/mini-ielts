import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Question from '../components/Question';
import './Listen.css';
import api from '../api/api';

const Reading = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [results, setResults] = useState([]);
  const [score, setScore] = useState(0);

  const api_url = api;

  let currentQuestion = 1;

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

    const results = Object.keys(correctAnswers).map((questionNumber) => {
      const correctAnswer = correctAnswers[questionNumber];
      const selectedAnswer = selectedAnswers[questionNumber];
      const isCorrect =
        Array.isArray(selectedAnswer) && Array.isArray(correctAnswer)
          ? selectedAnswer.sort().toString() === correctAnswer.sort().toString()
          : selectedAnswer === correctAnswer;

      return isCorrect;
    });

    setResults(results);
    setScore(results.filter((result) => result).length);
  };

  useEffect(() => {
    console.log(selectedAnswers);
  }, [selectedAnswers]);

  useEffect(() => {
    setCorrectAnswers(getCorrectAnswers());
  }, [post]);

  //youtube watch videolink to get embed link
  const youtubeParser = (url) => {
    let youtubeEmbedLink = url.replace("watch?v=", "embed/");
    return youtubeEmbedLink;
  }

  return (
    <div className="reading-container">
      <div className='left-content'>
        <h1 className="reading-title">{post.post_title}</h1>
        {
          post.listening_link ? (
            <div className="centered-iframe">
              <iframe  // Add the centered-iframe class
                width="800" height="450" src={youtubeParser(post.listening_link)}>
              </iframe>
            </div>
          ) :
            null
        }
        {
          post.audio_file_url ? (
            <div className="centered-audio">
              <audio controls>
                <source src={post.audio_file_url} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ) :
            null
        }

      </div>
      <div className='right-content'>
        {post.sections && post.sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
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
        ))}
        <button onClick={checkAnswer}>Check Answer</button>
        <div className="question-results">
          <h3>Results:</h3>
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
      </div>

    </div>
  );
}

export default Reading;
