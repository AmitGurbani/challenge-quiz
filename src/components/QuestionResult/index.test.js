import { fireEvent, render, screen } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import QuestionResult from '.'

describe('Question result component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<QuestionResult isSuccess />, div)
    unmountComponentAtNode(div)
  })

  it('should contain Correct! on success', () => {
    render(<QuestionResult isSuccess />)
    const questionResult = screen.getByTestId('question-result')
    expect(questionResult.textContent).toContain('Correct!')
  })

  it('should contain Sorry! on failure', () => {
    render(<QuestionResult isSuccess={false} />)
    const questionResult = screen.getByTestId('question-result')
    expect(questionResult.textContent).toContain('Sorry!')
  })

  it('should call onNext event', () => {
    const onNext = jest.fn()
    render(<QuestionResult isSuccess={false} onNext={onNext} />)
    const questionResult = screen.getByTestId('question-result')
    expect(questionResult.textContent).toContain('Next Question')
    const buttonNext = screen.getByTestId('button-next')
    fireEvent.click(buttonNext)
    expect(onNext).toHaveBeenCalled()
  })
})
