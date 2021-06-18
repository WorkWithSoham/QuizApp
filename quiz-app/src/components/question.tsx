import React from "react";


type Props = {
    question: string;
    answers: string[];
    callback: any;
    questionNumber: number;
    userAnswer: any;
    totalQuestions: number;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, questionNumber, userAnswer, totalQuestions }) => {

    return (
        <div>
            <p className="number">
                Question = {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map(answer => (
                    <div key={answer}>
                        <button className="btn btn-outline-info m-2" disabled={userAnswer} value={answer} onClick={callback}>
                            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default QuestionCard;