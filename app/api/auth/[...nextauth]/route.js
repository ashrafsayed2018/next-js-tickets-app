import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import User from '@/app/(models)/user'

export const authOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials

        // Check if the user exists
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
          throw new Error('User not found')
        }

        // Compare password with hashed password
        const checkPassword = await bcrypt.compare(
          password,
          existingUser.password
        )

        if (!checkPassword) {
          throw new Error('Incorrect password')
        }

        // If credentials are correct, return the user
        return existingUser
      },
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
