// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import HomeWorks from './HomeWorks';
import Timer from './Timer';
import EndExamButton from './EndExamButton';

const categories = [
    {
        name: 'Science Gadgets Questions',
        apiUrl: 'https://opentdb.com/api.php?amount=10&category=30&difficulty=easy&type=multiple',
    },
    {
        name: 'Computer Questions',
        apiUrl: 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple',
    },
    {
        name: 'Film Questions',
        apiUrl: 'https://opentdb.com/api.php?amount=10&category=11&difficulty=easy&type=multiple',
    },
    {
        name: 'Politics Questions',
        apiUrl: 'https://opentdb.com/api.php?amount=10&category=24&difficulty=easy&type=multiple',
    },
];

function App() {
    const [questions, setQuestions] = useState([]);
    const [apiUrl, setApiUrl] = useState('');
    const [select, setSelected] = useState(true);
    const [ended, setEnded] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (apiUrl) {
            fetchQuestions(apiUrl);
            setSelected(false);
        }
    }, [apiUrl]);

    const fetchQuestions = async (url) => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setQuestions(data.results);
            } else {
                throw new Error('Failed to fetch data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleFetchQuestions = (url) => {
        setApiUrl(url);
    };

    const handleEndExam = (marked) => {
        setEnded(true);
        setSelected(true);
        setQuestions([]); // Clear questions when ending exam
        setResults(marked); // Store the marked answers for display
    };

    return (
        <div>
            {!select && <Timer select={select} />}
            {!select && <EndExamButton onClick={() => handleEndExam(questions)} />}
            {select && (
                <div className="button-container">
                    {categories.map((category, index) => (
                        <button key={index} onClick={() => handleFetchQuestions(category.apiUrl)}>
                            {category.name}
                        </button>
                    ))}
                </div>
            )}
            {!select && <h1>Questions</h1>}

            {!select &&
                questions.map((question, index) => (
                    <HomeWorks key={index} question={question} onExamSubmit={handleEndExam} end={ended} />
                ))}

            {ended && (
                <div>
                    <h2>Exam Results</h2>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>{result.question}: {result.answer}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default App;
