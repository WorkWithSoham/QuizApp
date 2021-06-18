import React from "react";
import { AnswerObject } from "./MainGame";
import { Wrapper, ButtonWrapper } from './question.styles'

type Props = {
    question: string;
    answers: string[];
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
    questionNumber: number;
    userAnswer: AnswerObject | undefined;
    totalQuestions: number;
    correctAnswer: string;
}

const QuestionCard: React.FC<Props> = ({ question, answers, callback, questionNumber, userAnswer, totalQuestions, correctAnswer }) => {

    return (
        <Wrapper>
            <p className="number">
                Question = {questionNumber} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question }}></p>
            <div>
                {answers.map(answer => (
                    <ButtonWrapper
                        key={answer}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}
                    >
                        <button
                            className="m-2"
                            disabled={!!userAnswer}
                            value={answer}
                            onClick={callback}
                        >
                            <span dangerouslySetInnerHTML={{ __html: answer }}></span>
                        </button>
                    </ButtonWrapper>
                ))}
            </div>
        </Wrapper>
    )
}


export default QuestionCard;