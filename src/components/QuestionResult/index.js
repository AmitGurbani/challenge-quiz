/**
 * Component to render result of single question
 * @param {object} props
 * @param {true} props.isSuccess
 * @param {() => void} props.onNext
 * @returns
 */
export default function QuestionResult ({
  isSuccess, onNext
}) {
  return (
    <div data-testid='question-result'>
      <h5>{isSuccess ? 'Correct!' : 'Sorry!'}</h5>
      <button data-testid='button-next' onClick={() => onNext()}>Next Question</button>
    </div>
  )
}
