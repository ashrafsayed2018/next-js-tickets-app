'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getSession, signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const LoginForm = () => {
  const [loading, setLoading] = useState(true)

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
      const response = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (response.status === 200) {
        toast.success('login successful!')
        setFormData({ email: '', password: '' })
        router.push('/')
        router.refresh()
      } else {
        toast.error('email or password is incorrect')
      }
    } catch (error) {
      console.error(error)
      toast.error('An unexpected error occurred. Please try again later.')
    }
  }
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
        <h1 className="mb-4 text-center">Login</h1>
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
          Login
        </button>
        <Link href={'/register'}>
          <p className="text-center text-white hover:text-blue-400">
            Don't have an account?
          </p>
        </Link>
      </form>
    </div>
  )
}

export default LoginForm
