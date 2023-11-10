import { useEffect, useState } from 'react'
import { shuffle } from '../utils'

export default function useQuiz () {
  const [question, setQuestion] = useState({})
  const [totalQuestions, setTotalQuestions] = useState(1)
  const [questionIndex, setQuestionIndex] = useState(-1)
  const [score, setScore] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const submitAnswer = (answer) => {
    if (answer === decodeURIComponent(question.correct_answer)) {
      setScore(prevScore => prevScore + 1)
    }
  }

  const fetcNextQuestion = async () => {
    if (questionIndex < totalQuestions) {
      try {
        setIsLoading(true)
        const response = await fetch(`http://localhost:3001/questions?_page=${questionIndex + 2}&_limit=1`)
        setTotalQuestions(Number(response.headers.get('X-Total-Count')))
        const questions = await response.json()
        setQuestion({
          ...questions[0],
          options: shuffle(questions[0].incorrect_answers.concat(questions[0].correct_answer))
        })
        setQuestionIndex(prev => prev + 1)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    fetcNextQuestion()
  }, [])

  return {
    question,
    totalQuestions,
    questionIndex,
    score,
    isLoading,
    submitAnswer,
    fetcNextQuestion
  }
}
