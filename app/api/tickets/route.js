import { NextResponse } from 'next/server'
import Ticket from '../../(models)/ticket'

export async function POST(request) {
  try {
    const body = await request.json()

    const newTicket = new Ticket(body)

    await newTicket.save()

    return NextResponse.json({
      message: 'Success',
      status: 200,
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: 'Something went wrong',
      status: 500,
    })
  }
}

// get all tickets
export async function GET() {
  try {
    const tickets = await Ticket.find()
    return NextResponse.json({
      message: 'Success',
      status: 200,
      tickets,
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: 'Something went wrong',
      status: 500,
    })
  }
}
