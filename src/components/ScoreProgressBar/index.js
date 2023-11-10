/**
 * Component to render score progress bar
 * @param {object} props
 * @param {number} props.min
 * @param {number} props.current
 * @param {number} props.max
 * @returns
 */
export default function ScoreProgressBar ({
  current, max, min
}) {
  const currentProgressWidth = (current ?? 0) - (min ?? 0)
  const maxProgressWidth = (max ?? 0) - (current ?? 0)
  return (
    <div data-testid='score-progress-bar'>
      <div className='d-flex'>
        <span className='mr-auto'>Score: {current}%</span>
        <span>Max Score: {max}%</span>
      </div>
      <div className='progress'>
        <div
          data-testid='min-progress'
          className='progress-bar' role='progressbar' style={{
            width: `${min ?? 0}%`
          }} aria-valuenow={`${min ?? 0}`} aria-valuemin='0' aria-valuemax='100'
        />
        <div
          data-testid='current-progress'
          className='progress-bar bg-success' role='progressbar' style={{
            width: `${currentProgressWidth}%`
          }} aria-valuenow={`${currentProgressWidth}`} aria-valuemin='0' aria-valuemax='100'
        />
        <div
          data-testid='max-progress'
          className='progress-bar bg-info' role='progressbar' style={{
            width: `${maxProgressWidth}%`
          }} aria-valuenow={`${maxProgressWidth}`} aria-valuemin='0' aria-valuemax='100'
        />
      </div>
    </div>
  )
}
