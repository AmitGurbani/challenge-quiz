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
    <div data-testid='question-result' className='w-100'>
      <h5 className='mx-auto text-center'>{isSuccess ? 'Correct!' : 'Sorry!'}</h5>
      <button data-testid='button-next' className='mx-auto w-100' onClick={() => onNext()}>Next Question</button>
    </div>
  )
}
