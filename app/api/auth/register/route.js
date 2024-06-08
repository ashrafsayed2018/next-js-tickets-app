import bcrypt from 'bcrypt'
import User from '../../../(models)/user'
import { NextResponse } from 'next/server'
export async function POST(request) {
  try {
    const { email, password } = await request.json()

    // validate email is valide email
    if (!email || !email.includes('@')) {
      return NextResponse.json({
        error: 'Invalid email address',
        message: 'Something went wrong',
        status: 422,
      })
    }

    // validate password
    if (!password || password.trim().length < 7) {
      return NextResponse.json({
        error: 'Invalid password',
        message: 'Something went wrong',
        status: 422,
      })
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    // check if user already exists

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return NextResponse.json({
        error: 'User already exists',
        message: 'Something went wrong',
        status: 422,
      })
    }

    const user = await User.create({ email, password: hashedPassword })
    return NextResponse.json({
      message: 'Success',
      status: 200,
      user,
    })
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      message: 'Something went wrong',
      status: 500,
    })
  }
}
