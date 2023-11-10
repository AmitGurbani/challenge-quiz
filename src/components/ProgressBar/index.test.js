import { render, screen } from '@testing-library/react'
import ProgressBar from '.'
import { unmountComponentAtNode } from 'react-dom'

describe('Progress bar component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    render(<ProgressBar value={33} />, div)
    unmountComponentAtNode(div)
  })

  it('should display progress with width 0% when no value provided', () => {
    render(<ProgressBar />)
    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar.style.width).toEqual('0%')
  })

  it('should display progress with width 25%', () => {
    render(<ProgressBar value={25} />)
    const progressBar = screen.getByTestId('progress-bar')
    expect(progressBar.style.width).toEqual('25%')
  })
})
