/**
 * Component to render progress bar
 * @param {object} props
 * @param {number} props.value
 * @returns
 */
export default function ProgressBar ({ value }) {
  return (
    <div className='progress'>
      <div
        data-testid='progress-bar' className='progress-bar' role='progressbar' style={{
          width: `${value ?? 0}%`
        }} aria-valuenow={`${value ?? 0}`} aria-valuemin='0' aria-valuemax='100'
      />
    </div>
  )
}
