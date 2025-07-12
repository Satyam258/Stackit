import { Bell, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function Navbar() {
  const isLoggedIn = false 
  const unreadNotifications = 3 

  return (
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-400 sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl  text-black text-shadow-amber-950 font-extrabold font-stretch-50%">
        StackIt
      </Link>

      {/* Center Nav Links  */}
      <div className="hidden md:flex gap-6 text-gray-800 font-medium">
        <Link to="/ask" className="hover:text-blue-800 transition">Ask Question</Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <div className="relative cursor-pointer">
          <Bell className="w-6 h-6 text-gray-800" />
          {unreadNotifications > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
              {unreadNotifications}
            </span>
          )}
        </div>

        {/* Auth Buttons or User Avatar */}
        {!isLoggedIn ? (
          <div className="flex gap-3">
            <Link to="/login" className="text-sm text-gray-800 hover:text-blue-800 font-medium">Login</Link>
            <Link to="/register" className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Register</Link>
          </div>
        ) : (
          <UserCircle className="w-8 h-8 text-gray-700 cursor-pointer" />
        )}
      </div>
    </nav>
  )
}

export default Navbar
