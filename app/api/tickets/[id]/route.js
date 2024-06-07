import mongoose from 'mongoose'
import Ticket from '../../../(models)/ticket'
import { NextResponse } from 'next/server'

export async function DELETE(req) {
  const url = new URL(req.url)
  const id = url.pathname.split('/').pop()
  const ObjectId = new mongoose.Types.ObjectId(id)

  try {
    await mongoose.connect(process.env.MONGODB_URI)
    const ticket = await Ticket.findByIdAndDelete(ObjectId)
    return NextResponse.json({
      message: 'Success',
      status: 200,
      ticket,
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: 'Something went wrong',
      status: 500,
    })
  }
}

// get ticket by id
export async function GET(req, { params }) {
  try {
    const { id } = params
    const ticket = await Ticket.findOne({ _id: id })
    return NextResponse.json({
      message: 'Success',
      status: 200,
      ticket,
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: 'Something went wrong',
      status: 500,
    })
  }
}

// update ticket by id
export async function PUT(req, { params }) {
  try {
    const { id } = params
    const body = await req.json()
    const ticket = await Ticket.findByIdAndUpdate(id, body, { new: true })
    return NextResponse.json({
      message: 'Success',
      status: 200,
      ticket,
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: 'Something went wrong',
      status: 500,
    })
  }
}
