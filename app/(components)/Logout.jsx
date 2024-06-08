'use client'
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = () => {
  return (
    <div>
      <button className="btn btn-primary text-white" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  )
}

export default Logout
