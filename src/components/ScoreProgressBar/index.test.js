import { render, screen } from '@testing-library/react'
import { unmountComponentAtNode } from 'react-dom'
import ScoreProgressBar from '.'

describe('Score progress bar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<ScoreProgressBar min={20} current={40} max={80} />, div)
    unmountComponentAtNode(div)
  })

  it('should display progress for values', () => {
    const props = {
      min: 20, current: 40, max: 80
    }
    render(<ScoreProgressBar min={props.min} current={props.current} max={props.max} />)
    const scoreProgressBar = screen.getByTestId('score-progress-bar')
    expect(scoreProgressBar.textContent).toContain(`Score: ${props.current}%`)
    expect(scoreProgressBar.textContent).toContain(`Max Score: ${props.max}%`)

    const minProgress = screen.getByTestId('min-progress')
    expect(minProgress.style.width).toEqual(`${props.min}%`)

    const currentProgress = screen.getByTestId('current-progress')
    expect(currentProgress.style.width).toEqual(`${props.current - props.min}%`)

    const maxProgress = screen.getByTestId('max-progress')
    expect(maxProgress.style.width).toEqual(`${props.max - props.current}%`)
  })
})
