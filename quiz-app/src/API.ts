import { shuffleArray } from "./utils"

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type QuestionType = {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: string[]
}

export type QuestionState = QuestionType & { answers: string[] }

export interface Params {
    count: number
    difficulty: Difficulty
}

export const getQuizQuestions = async (params: Params) => {
    const url = `https://opentdb.com/api.php?amount=${params.count}&difficulty=${params.difficulty}`

    const response = await (await fetch(url)).json()

    return response.results.map((question: QuestionType) => (
        {
            ...question,
            answers: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
    ))



}
