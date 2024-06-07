'use client'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'

const Delete = ({ id }) => {
  const router = useRouter()
  const deleteTicket = async () => {
    const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
      method: 'DELETE',
      cache: 'no-store',
    })
    if (res.ok) {
      router.refresh()
    } else {
      console.log('Something went wrong')
    }
  }
  return (
    <FontAwesomeIcon
      icon={faX}
      onClick={deleteTicket}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
    />
  )
}

export default Delete
