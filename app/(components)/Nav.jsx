import { faHome, faTicket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getServerSession } from 'next-auth'
import Link from 'next/link'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Logout from './Logout'

const Nav = async () => {
  const session = await getServerSession(authOptions)
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href={'/'}>
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>
        <Link href={'/ticket/new'}>
          <FontAwesomeIcon icon={faTicket} className="icon" />
        </Link>
      </div>
      <div>
        {session ? (
          <Logout />
        ) : (
          <Link href={'/login'} className="btn btn-primary text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Nav
