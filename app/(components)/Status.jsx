const Status = ({ status }) => {
  // set style if status is done green and if is not started red and if is in progress yellow
  const style = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-200'
      case 'not started':
        return 'bg-red-200'
      case 'in progress':
        return 'bg-yellow-200'
      default:
        return ''
    }
  }
  return (
    <span
      className={`inline-block rounded-full px-2 py-1 text-xs font-semibold text-gray-700  ${style(
        status
      )}`}
    >
      {status}
    </span>
  )
}

export default Status
