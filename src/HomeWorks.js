// HomeWorks.js
import React, { useState, useEffect } from 'react';

function HomeWorks({ question, onExamSubmit, end }) {
    const {
        question: questionText,
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
    } = question;

    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [markedAnswers, setMarkedAnswers] = useState([]);

    // Shuffle function to jumble the answers
    const shuffleAnswers = (answers) => {
        return answers.slice().sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        setShuffledAnswers(shuffleAnswers([...incorrectAnswers, correctAnswer]));
    }, [incorrectAnswers, correctAnswer]);

    const handleRadioChange = (event) => {
        const { value } = event.target;
        setMarkedAnswers((prevAnswers) => [...prevAnswers, value]);
    };

    useEffect(() => {
        if (end) {
            onExamSubmit(markedAnswers.map((answer, index) => ({
                question: `Question ${index + 1}`,
                answer,
            }))); // Send the array of selected options to parent component
        }
    }, [end, markedAnswers, onExamSubmit]);

    return (
        <div className="quiz-container">
            <h3 className="quiz-question">{questionText}</h3>
            <form>
                {shuffledAnswers.map((option, index) => (
                    <div className="quiz-answer" key={index}>
                        <label>
                            <input
                                type="radio"
                                name={`question${questionText}`}
                                value={option}
                                onChange={handleRadioChange}
                            />
                            {option}
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
}

export default HomeWorks;
