import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NavbarNormalvictim from '../NavbarNormalvictim';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { Modal, message } from "antd";

const QuizComponent = () => {
    const [questions, setQuestions] = useState([]);
    const [userResponses, setUserResponses] = useState([]);
    const [attemptedQuestions, setAttemptedQuestions] = useState(0);
    const [timer, setTimer] = useState(300); // 5 minutes in seconds
    const [submittingQuiz, setSubmittingQuiz] = useState(false);

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

    const handleSubmitQuiz = async () => {
        Modal.confirm({
            title: 'Are you sure you want to submit the quiz?',
            onOk() {
                submitQuiz();
            },
            onCancel() {
                message.info('Quiz submission canceled.');
            },
        });
    };

    const submitQuiz = useCallback(async () => {
        try {
            setSubmittingQuiz(true);

            const correct = questions.reduce((count, question, index) => {
                if (userResponses[index] === question.correct_answer) {
                    return count + 1;
                }
                return count;
            }, 0);

            const wrong = attemptedQuestions - correct;
            await new Promise(resolve => setTimeout(resolve, 2000));
            navigate('/quiz-summary', {
                state: {
                    correctAnswers: correct,
                    wrongAnswers: wrong,
                    attemptedQuestions,
                },
            });
        } catch (error) {
            console.error('Error submitting quiz:', error);
        } finally {
            setSubmittingQuiz(false);
        }
    }, [questions, userResponses, attemptedQuestions, navigate]);


    const handleTimeUp = useCallback(() => {
        message.warning('Time is up! Quiz will be submitted.')
        submitQuiz();
    }, [submitQuiz]);


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
                            <li key={index} style={{ listStyleType: 'none' }}>
                                <p style={{ paddingTop: '15px', fontWeight: '600', fontSize: '18px' }}>{`${index + 1}. ${question.questionText}`}</p>
                                <ul>
                                    {question.options && question.options.length > 0 && question.options.map((option, optionIndex) => (
                                        <li key={optionIndex} style={{ listStyleType: 'none' }}>
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

            <div style={{ display: 'flex', marginLeft: '12.5rem', marginBottom: '50px', marginTop: '30px' }}>
                <button style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                }} className="btn btn-primary"
                    onClick={handleSubmitQuiz} disabled={submittingQuiz} // Disable the button when submitting
                >
                    {submittingQuiz ? <CircularProgress size={20} style={{ marginRight: '8px' }} /> : null}
                    Submit Quiz
                </button>
            </div>


            <Footer />
        </div>
    );
};

export default QuizComponent;
