import { act, render, screen } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import Quiz from '.'

describe('Quiz component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<Quiz />, div)
    unmountComponentAtNode(div)
  })

  it('should display question with progress', async () => {
    const mockQuestions = [
      {
        category: 'Entertainment%3A%20Video%20Games',
        type: 'multiple',
        difficulty: 'hard',
        question: 'What was the name of the hero in the 80s animated video game Dragons Lair?',
        correct_answer: 'Dirk the Daring',
        incorrect_answers: [
          'Arthur',
          'Sir Toby Belch',
          'Guy of Gisbourne'
        ]
      }
    ]
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({
      headers: new Headers({
        'X-Total-Count': 10
      }),
      json: () => Promise.resolve(mockQuestions)
    }))
    await act(async () => {
      render(<Quiz />)
    })
    const quiz = screen.getByTestId('quiz')
    expect(quiz.textContent).toContain(mockQuestions[0].question)
    expect(quiz.textContent).toContain('Question 1 of 10')

    global.fetch.mockRestore()
  })
})
