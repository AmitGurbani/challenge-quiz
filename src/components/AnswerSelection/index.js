import { useState } from 'react'

/**
 * Component to render question along with options
 * @param {object} props
 * @param {string} props.question
 * @param {string[]} props.options
 * @param {string} props.answer
 * @param {(option: string) => void} props.onSelect
 * @returns
 */
export default function AnswerSelection ({
  answer, options, question, onSelect
}) {
  const [selectedOption, setSelectedOption] = useState(null)
  const handleClick = (option) => {
    if (!selectedOption) {
      onSelect(option)
      setSelectedOption(option)
    }
  }

  return (
    <div data-testid='answer-selection'>
      <h4>{question}</h4>
      {options?.map((option) => (
        <button
          data-testid='option'
          key={decodeURIComponent(option)}
          onClick={() => handleClick(decodeURIComponent(option))}
        >{decodeURIComponent(option)}
        </button>))}
    </div>
  )
}
