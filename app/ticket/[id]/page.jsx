import TicketForm from '@/app/(components)/TicketForm'

const getTicketById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/tickets/${id}`, {
    cache: 'no-store',
  })
  if (res.ok) {
    const data = await res.json()
    return data.ticket
  } else {
    console.log('Something went wrong')
  }
}

const TicketPage = async ({ params }) => {
  const editMode = params.id === 'new' ? false : true
  let updaedTicketData = {}

  if (editMode) {
    updaedTicketData = await getTicketById(params.id)
  } else {
    updaedTicketData = {}
  }
  return (
    <div>
      <TicketForm editMode={editMode} ticketData={updaedTicketData} />
    </div>
  )
}

export default TicketPage
