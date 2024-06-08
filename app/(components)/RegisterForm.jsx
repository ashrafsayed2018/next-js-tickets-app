'use client'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const RegisterForm = () => {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const handleSumbit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.status === 200) {
        toast.success('Registration successful!')
        setFormData({ email: '', password: '' })
        router.push('/login')
      } else {
        toast.error(data.error || 'An error occurred. Please try again.')
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred. Please try again later.')
    }
  }
  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.push('/')
      }
      setTimeout(() => {
        setLoading(false)
      }, 1000)
    })
  }, [])
  if (loading) {
    return (
      <p className="fixed inset-0 h-screen bg-blue-500 flex items-center justify-center">
        Loading...
      </p>
    )
  }
  return (
    <div>
      <ToastContainer />

      <form
        className="flex flex-col gap-3 max-w-md mx-auto mt-10"
        onSubmit={handleSumbit}
      >
        <h1 className="mb-4 text-center">Register</h1>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="border-black mt-4"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="border-black mt-4"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary text-white">
          Register
        </button>
        <Link href={'/login'}>
          <p className="text-center text-white hover:text-blue-400">
            Already have an account?
          </p>
        </Link>
      </form>
    </div>
  )
}

export default RegisterForm
