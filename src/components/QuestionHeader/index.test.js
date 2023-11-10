import { render, screen } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import QuestionHeader from '.'

describe('Question header component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<QuestionHeader category='Entertainment' currentQuestionIndex={5} difficulty='easy' totalQuestions={15} />, div)
    unmountComponentAtNode(div)
  })

  it('should contain correct values when provided', () => {
    render(<QuestionHeader category='Entertainment' currentQuestionIndex={5} difficulty='easy' totalQuestions={15} />)
    const questionHeader = screen.getByTestId('question-header')
    expect(questionHeader.textContent).toContain('Question 5 of 15')
    expect(questionHeader.textContent).toContain('Entertainment')
  })
})
