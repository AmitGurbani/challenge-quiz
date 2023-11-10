import { fireEvent, render, screen } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import AnswerSelection from '.'

describe('Answer selection component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<AnswerSelection answer='Yes' options={['No', 'Yes']} question='Are you enjoying the quiz?' />, div)
    unmountComponentAtNode(div)
  })

  it('should contain correct values when provided', () => {
    render(<AnswerSelection answer='Yes' options={['No', 'Yes']} question='Are you enjoying the quiz?' />)
    const answerSelection = screen.getByTestId('answer-selection')
    expect(answerSelection.textContent).toContain('Are you enjoying the quiz?')
    expect(answerSelection.textContent).toContain('Yes')
    expect(answerSelection.textContent).toContain('No')
  })

  it('should contain 2 options when 2 options are provided', () => {
    render(<AnswerSelection answer='Yes' options={['No', 'Yes']} question='Are you enjoying the quiz?' />)
    const options = screen.getAllByTestId('option')
    expect(options.length).toEqual(2)
  })

  it('should contain 4 options when 4 options are provided', () => {
    render(<AnswerSelection answer='3' options={['4', '2', '3', '6']} question='Which one of these is odd number?' />)
    const options = screen.getAllByTestId('option')
    expect(options.length).toEqual(4)
  })

  it('should display options in correct order as provided', () => {
    const options = ['4', '2', '3', '6']
    render(<AnswerSelection answer='3' options={options} question='Which one of these is odd number?' />)
    const optionElements = screen.getAllByTestId('option')
    for (let i = 0; i < optionElements.length; i++) {
      const optionElement = optionElements[i]
      expect(optionElement.textContent).toEqual(options[i])
    }
  })

  it('should select value when option is clicked', () => {
    const onSelect = jest.fn()
    render(<AnswerSelection answer='Yes' options={['No', 'Yes']} question='Are you enjoying the quiz?' onSelect={onSelect} />)
    const options = screen.getAllByTestId('option')
    const buttonNo = options[0]
    fireEvent.click(buttonNo)
    expect(onSelect).toHaveBeenCalledWith('No')
  })

  it('should call onSelect only once', () => {
    const onSelect = jest.fn()
    render(<AnswerSelection answer='Yes' options={['No', 'Yes']} question='Are you enjoying the quiz?' onSelect={onSelect} />)
    const options = screen.getAllByTestId('option')
    const buttonNo = options[0]
    fireEvent.click(buttonNo)
    fireEvent.click(buttonNo)
    fireEvent.click(buttonNo)
    expect(onSelect).toHaveBeenCalledTimes(1)
  })
})
