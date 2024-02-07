import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NavbarNormalvictim from '../NavbarNormalvictim';
import Footer from '../Footer';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [userResponses, setUserResponses] = useState([]);
    const [attemptedQuestions, setAttemptedQuestions] = useState(0);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch random questions from the server
        const fetchRandomQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quiz/get-questions');
                setQuestions(response.data.questions);

                // Initialize userResponses with empty values for each question
                setUserResponses(Array(response.data.questions.length).fill(''));

            } catch (error) {
                console.error('Error fetching random questions:', error);
            }
        };

        fetchRandomQuestions();
    }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

    const handleSubmitQuiz = useCallback(() => {
        const correct = questions.reduce((count, question, index) => {
            if (userResponses[index] === question.correct_answer) {
                return count + 1;
            }
            return count;
        }, 0);

        const wrong = attemptedQuestions - correct;

        navigate('/quiz-summary', {
            state: {
                correctAnswers: correct,
                wrongAnswers: wrong,
                attemptedQuestions,
            },
        });
    }, [questions, userResponses, attemptedQuestions, navigate]);


    const handleTimeUp = useCallback(() => {
        alert('Time is up! Quiz will be submitted.');
        handleSubmitQuiz();
    }, [handleSubmitQuiz]);


    useEffect(() => {
        // Start the timer countdown
        const timerInterval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(timerInterval);
                    handleTimeUp();
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [handleTimeUp]);

    const handleResponseChange = (questionIndex, optionIndex) => {
        const updatedResponses = [...userResponses];
        const selectedOption = questions[questionIndex].options[optionIndex];
        updatedResponses[questionIndex] = selectedOption;
        setUserResponses(updatedResponses);

        setAttemptedQuestions(updatedResponses.filter(response => response !== '').length);
    };




    return (
        <div>
            <NavbarNormalvictim />

            {/* black div */}
            <div
                style={{
                    background: 'linear-gradient(to right, #000000, #333333)',
                    color: 'white',
                    padding: '75px 88px',
                    height: '40vh',
                }}
            >
                {/* Heading */}
                <h1 style={{ color: 'rgba(59, 177, 155, 1)', marginLeft: '30px', marginTop: '10px', fontSize: '55px' }}>FLOODAWARE QUIZ</h1>

                {/* Description */}
                <div style={{ marginLeft: '30px', marginTop: '20px' }}>
                    <p style={{ fontSize: '20px' }}>
                        This quiz is designed to test and enhance your understanding of floods, their causes, effects, and the measures you can
                    </p>
                    <p style={{ fontSize: '20px', lineHeight: '0' }}>
                        take to stay prepared. Dive in and discover how flood-aware you truly are!</p>
                </div>
            </div>
            <h2 style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '20px' }}>Quiz Questions</h2>

            {/* Countdown */}
            <div style={{ position: 'sticky', top: 0, background: 'white', zIndex: 1, paddingRight: '30px', paddingTop: '10px', textAlign: 'right', fontWeight: '500', fontSize: '20px' }}>
                Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
            </div>

            {/* questions */}
            <div style={{ marginLeft: '10rem' }}>

                <ul>
                    {questions && questions.length > 0 ? (
                        questions.map((question, index) => (
                            <li key={index}>
                                <p style={{ paddingTop: '15px', fontWeight: '600', fontSize: '18px' }}>{`${index + 1}. ${question.questionText}`}</p>
                                <ul>
                                    {question.options && question.options.length > 0 && question.options.map((option, optionIndex) => (
                                        <li key={optionIndex}>
                                            <input
                                                type="radio"
                                                id={`option-${index}-${optionIndex}`}
                                                name={`question-${index}`}
                                                checked={userResponses[index] === option}
                                                onChange={() => handleResponseChange(index, optionIndex)}
                                            />
                                            <label style={{ paddingLeft: '8px' }} htmlFor={`option-${index}-${optionIndex}`}>{option}</label>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))
                    ) : (
                        <p>Loading questions...</p>
                    )}
                </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px', marginTop: '30px' }}>
                <Button style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "30px", width: "140px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    cursor: "pointer",
                }}
                    onClick={handleSubmitQuiz}>Submit Quiz</Button>
            </div>


            <Footer />
        </div>
    );
};

export default QuizComponent;
