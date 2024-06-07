'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const TicketForm = ({ editMode, ticketData }) => {
  const initialFormData = editMode
    ? ticketData
    : {
        title: '',
        description: '',
        category: 'hardware problem',
        priority: 1,
        progress: 0,
        status: 'not started',
        active: false,
      }
  console.log(initialFormData)
  const router = useRouter()
  const [formData, setFormData] = useState(initialFormData)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editMode) {
      const res = await fetch(`/api/tickets/${ticketData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        console.log('something went wrong')
      }
    } else {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        router.push('/')
        router.refresh()
      } else {
        console.log('something went wrong')
      }
    }
  }
  return (
    <div className="flex justify-center">
      <form
        className="flex flex-col gap-3 w-1/2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h3>{editMode ? 'Update Ticket' : 'Create New Ticket'}</h3>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category">category</label>
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="hardware problem">hardware problem</option>
            <option value="software problem">software problem</option>
            <option value="other">other</option>
          </select>
        </div>
        <div>
          <label htmlFor="priority">priority</label>
          <select
            name="priority"
            id="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div>
          <label htmlFor="progress">progress</label>
          <input
            type="range"
            name="progress"
            id="progress"
            min={0}
            max={100}
            value={formData.progress}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="status">status</label>
          <select
            name="status"
            id="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="not started">not started</option>
            <option value="in progress">in progress</option>
            <option value="completed">completed</option>
          </select>
        </div>

        <button type="submit" className="btn text-white max-w-xs mx-auto">
          {editMode ? 'Update Ticket' : 'Create Ticket'}
        </button>
      </form>
    </div>
  )
}

export default TicketForm
