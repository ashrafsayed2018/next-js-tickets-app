import Link from 'next/link'
import TicketCard from './(components)/ticket-card'
const getTickets = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/tickets', {
      method: 'GET',
      cache: 'no-store',
    })
    return res.json()
  } catch (error) {
    console.log(error)
  }
}
const Dashboard = async () => {
  const { tickets } = await getTickets()
  const uniqueCategories = [...new Set(tickets.map(({ category }) => category))]
  return (
    <div className="p-5">
      <div>
        {tickets && tickets.length ? (
          uniqueCategories.map((uniqueCategory, categoryIndex) => (
            <div key={categoryIndex} className="mb-4">
              <h2 className="text-xl font-bold mb-2 capitalize">
                {uniqueCategory}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4">
                {tickets &&
                  tickets
                    .filter((ticket) => ticket.category === uniqueCategory)
                    .map((ticket) => (
                      <TicketCard key={ticket._id} ticket={ticket} />
                    ))}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            <p className="text-center text-xl">No tickets found</p>
            <Link href="ticket/new" className="text-2xl text-blue-700">
              Create new ticket
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
