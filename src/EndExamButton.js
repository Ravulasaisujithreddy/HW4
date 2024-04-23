// EndExamButton.js
import React from 'react';

function EndExamButton({ onClick }) {
    return (
        <button className="end-exam-btn" onClick={onClick}>
            End Exam
        </button>
    );
}

export default EndExamButton;