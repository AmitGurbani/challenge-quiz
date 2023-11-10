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
    question,
    questionIndex,
    score,
    submitAnswer,
    totalQuestions
  } = useQuiz()
  const [isSuccess, setIsSuccess] = useState(false)
  const [isQuestionResultVisible, setIsQuestionResultVisible] = useState(false)
  const [answersSubmitted, setAnswersSubmitted] = useState(0)
  const currentScore = answersSubmitted === 0 ? 0 : score * 100 / answersSubmitted
  const maxScore = (totalQuestions - answersSubmitted + score) * 100 / totalQuestions
  const minScore = score * 100 / totalQuestions
  return (
    <div data-testid='quiz'>
    {
      question ? <>
      <ProgressBar value={(questionIndex + 1) * 100 / totalQuestions} />
      <div className='container'>
        <QuestionHeader
          category={question.category}
          currentQuestionIndex={questionIndex + 1}
          difficulty={question.difficulty}
          totalQuestions={totalQuestions}
        />
        <AnswerSelection
          key={decodeURIComponent(question.correct_answer)}
          answer={decodeURIComponent(question.correct_answer)}
          onSelect={(option) => {
            submitAnswer(option)
            setIsSuccess(option === decodeURIComponent(question.correct_answer))
            setIsQuestionResultVisible(true)
            setAnswersSubmitted(prev => prev + 1)
          }}
          options={question.options}
          question={question.question}
        />
        <div style={{
          width: '100%',
          height: '200px'
        }}>
        {
          answersSubmitted < totalQuestions && isQuestionResultVisible &&
            <QuestionResult
              isSuccess={isSuccess} onNext={() => {
                setIsSuccess(false)
                setIsQuestionResultVisible(false)
                fetcNextQuestion()
              }}
            />
        }
        </div>

        <ScoreProgressBar
          current={currentScore.toFixed()}
          max={maxScore.toFixed()}
          min={minScore.toFixed()}
        />
      </div></> : <>
        <p>Loading...</p>
      </>
    }
    </div>
  )
}
