import { useState } from 'react'
import useQuiz from '../../hooks/useQuiz'
import AnswerSelection from '../AnswerSelection'
import ProgressBar from '../ProgressBar'
import QuestionHeader from '../QuestionHeader'
import QuestionResult from '../QuestionResult'
import ScoreProgressBar from '../ScoreProgressBar'

/**
 * Component to fetch and render quiz
 * @returns
 */
export default function Quiz () {
  const {
    fetcNextQuestion,
    isLoading,
    question,
    questionIndex,
    score,
    submitAnswer,
    totalQuestions
  } = useQuiz()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isQuestionResultVisible, setIsQuestionResultVisible] = useState(false)
  return (
    <div data-testid='quiz'>
      <ProgressBar value={questionIndex * 100 / totalQuestions} />
      <div>
        <QuestionHeader
          category={question.category}
          currentQuestionIndex={questionIndex}
          difficulty={question.difficulty}
          totalQuestions={totalQuestions}
        />
        <AnswerSelection
          answer={decodeURIComponent(question.correct_answer)}
          onSelect={(option) => {
            submitAnswer(option)
            setIsSuccess(option === decodeURIComponent(question.correct_answer))
            setIsQuestionResultVisible(true)
          }}
          options={question?.incorrect_answers?.concat(question.correct_answer)}
          question={question.question}
        />
        {
          isQuestionResultVisible &&
            <QuestionResult
              isSuccess={isSuccess} onNext={() => {
                setIsSuccess(false)
                setIsQuestionResultVisible(false)
                fetcNextQuestion()
              }}
            />
        }

        <ScoreProgressBar
          current={score * 100 / questionIndex}
          max={(totalQuestions - questionIndex + score) * 100 / totalQuestions}
          min={score * 100 / totalQuestions}
        />
      </div>
    </div>
  )
}
