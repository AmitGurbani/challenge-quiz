/**
 * Component to render question header
 * @param {object} props
 * @param {number} props.totalQuestions
 * @param {number} props.currentQuestionIndex
 * @param {string} props.category
 * @param {'easy'|'medium'|'hard'} props.difficulty
 * @returns
 */
export default function QuestionHeader ({
  category, currentQuestionIndex, totalQuestions, difficulty
}) {
  return (
    <div data-testid='question-header'>
      <h3>Question {currentQuestionIndex} of {totalQuestions}</h3>
      <p>{decodeURIComponent(category)}</p>
      <p>{difficulty}</p>
    </div>
  )
}
