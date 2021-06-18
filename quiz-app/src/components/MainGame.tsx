import React, { useState } from "react";
import { getQuizQuestions, Difficulty, QuestionState } from "../API";
import QuestionCard from "./question";

export type AnswerObject = {
    question: string;
    options: string[];
    correct: boolean;
    correctAnswer: string;
    answer: string;
}

export default function MainGame() {

    const TOTAL_QUESTIONS: number = 10;
    const DIFFICULTY: Difficulty = Difficulty.EASY;

    const [loading, setLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)


    const beginQuiz = async () => {
        setLoading(true);
        setGameOver(false);

        const newQuestions = await getQuizQuestions({ count: TOTAL_QUESTIONS, difficulty: DIFFICULTY });

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0);
        setLoading(false);
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const userAnswer = e.currentTarget.value;

            const correct = userAnswer === questions[number].correct_answer
            const correctAnswer = questions[number].correct_answer
            const question = questions[number].question
            const options = questions[number].answers
            const answer = userAnswer

            if (correct) {
                setScore(prevScore => prevScore + 1)
            }

            const answerObject: AnswerObject = { correct, correctAnswer, question, options, answer }
            setUserAnswers(prevUserAnswers => [...prevUserAnswers, answerObject])
        }
    }

    const nextQuestion = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (number < 9) {
            setNumber(prevNumb => prevNumb + 1)
        }
        else {
            setGameOver(true)
        }
    }

    return (
        <div>
            {!gameOver ? <h2 style={{ color: "wheat" }}>Score: {score}</h2> : null}
            {!loading && !gameOver &&
                <QuestionCard
                    questionNumber={number + 1}
                    totalQuestions={TOTAL_QUESTIONS}
                    question={questions[number].question}
                    answers={questions[number].answers}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={checkAnswer}
                    correctAnswer={questions[number].correct_answer}
                />
            }
            {loading ? <p>Loading...</p> : null}
            {gameOver || userAnswers.length === TOTAL_QUESTIONS ?
                <button className="start btn btn-success m-2" onClick={beginQuiz}>Start Game</button> : null
            }
            {!gameOver && !loading && number !== TOTAL_QUESTIONS - 1 && userAnswers.length === number + 1 ?
                <button className="next btn btn-warning m-2" onClick={nextQuestion}>Next Question</button> : null
            }
        </div >
    )
}