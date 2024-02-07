import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const QuizSummary = () => {
    const location = useLocation();
    const { correctAnswers, wrongAnswers, attemptedQuestions } = location.state;

    const [score, setScore] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (attemptedQuestions > 0) {
            const calculatedScore = (correctAnswers / 10) * 100;
            setScore(parseInt(calculatedScore, 10));
        }
    }, [correctAnswers, attemptedQuestions]);

    const handleBackToHome = () => {
        navigate('/home-normalvictim');
    };

    const handlePlayAgain = () => {
        navigate('/play-quiz');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>

            <h1 style={{ marginTop: '4rem' }}>Quiz Summary</h1>

            <div style={{ marginTop: '4rem', backgroundColor: '#f0f0f0', padding: '2rem' }}>
                <h2 style={{ padding: '.5rem' }}>Your Score: {score}%</h2>
                <div style={{ fontWeight: '500', marginTop: '20px' }}>
                    <p>Total Number of Questions: 10</p>
                    <p>Number of Attempted Questions: {attemptedQuestions}</p>
                    <p>Number of Correct Answers: {correctAnswers}</p>
                    <p>Number of Wrong Answers: {wrongAnswers}</p>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '50px', marginTop: '4rem' }}>
                <Button style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "30px", width: "140px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    cursor: "pointer",
                }}
                    onClick={handlePlayAgain}>Play Again</Button>
                <Button style={{
                    backgroundColor: "#3bb19b", color: "white", border: "none", "outline": "none", paddingTop: "10px", paddingBottom: '10px', borderRadius: "30px", width: "140px",
                    fontWeight: "bold",
                    fontSize: "15px",
                    cursor: "pointer",
                    marginLeft: '10px'
                }}
                    onClick={handleBackToHome}>Back to Home</Button>
            </div>

        </div>

    );
};

export default QuizSummary;
