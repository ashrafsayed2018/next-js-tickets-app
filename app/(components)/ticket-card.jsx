import React from 'react'
import Delete from './Delete'
import PriorityDisplay from './priority-display'
import ProgressBar from './progress-bar'
import Status from './Status'
import Link from 'next/link'

const TicketCard = ({ ticket }) => {
  function formatDate(dateString) {
    const date = new Date(dateString)

    // Get the day, month, year, hours, and minutes
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')

    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM'

    // Convert hours to 12-hour format
    const hour = hours % 12 || 12

    // Construct the formatted date string
    return `${day}/${month}/${year} ${hour}:${minutes} ${ampm}`
  }
  return (
    <div className="flex flex-col bg-card hover:bg-card-hover rounded-md p-3 m-2 cursor-pointer">
      <div className="flex mb-3">
        <PriorityDisplay priority={ticket.priority} />
        <div className="ml-auto">
          <Delete id={ticket._id} />
        </div>
      </div>
      <Link href={`/ticket/${ticket._id}`} style={{ display: 'contents' }}>
        <h4>{ticket.title}</h4>
        <hr className="h-px bg-page mb-2" />
        <p className="whitespace-pre-wrap">{ticket.description}</p>
        <div className="flex-grow"></div>
        <div className="flex mt-2">
          <div className="flex flex-col">
            <p className="text-xs my-1">{formatDate(ticket.createdAt)}</p>
            <ProgressBar progress={ticket.progress} />
          </div>
          <div className="ml-auto flex items-end">
            <Status status={ticket.status} />
          </div>
        </div>
      </Link>
    </div>
  )
}

export default TicketCard
