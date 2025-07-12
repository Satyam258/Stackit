import { Bell, UserCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import "@fontsource/poppins"
import NotificationDropdown from './NotificationDropdown'
import { useAuth } from '../context/AuthContext'

function Navbar() {
    const { user, logout } = useAuth();
    const unreadNotifications = 3

    return (
        <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-gray-400 sticky top-0 z-50">
            {/* Logo */}
            <Link to="/" className="text-2xl  text-black text-shadow-amber-950 font-extrabold font-stretch-50%" style={{ fontFamily: "poppins" }}>
                StackIt
            </Link>

            {/* Center Nav Links  */}
            <div className="hidden md:flex gap-6 text-gray-800 font-medium">
                <Link to="/ask" className="hover:text-blue-800 transition text-xl" style={{ fontFamily: "roboto" }}>Ask Question</Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <NotificationDropdown />

                {/* Auth Buttons or User Avatar */}
                {!user ? (
                    <div className="flex gap-3">
                        <Link to="/login" className="text-sm text-gray-800 hover:text-blue-800 font-medium">Login</Link>
                        <Link to="/register" className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">Register</Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-4">
                        {/* Show admin panel link */}
                        {user.role === 'admin' && (
                            <Link to="/admin" className="text-sm text-blue-800 hover:underline">
                                Admin Panel
                            </Link>
                        )}
                        <span className="text-gray-800 text-sm">{user.username}</span>
                        <button onClick={logout} className="text-sm text-red-500 hover:underline">Logout</button>
                        <UserCircle className="w-7 h-7 text-gray-700" />
                    </div>
                )}

            </div>
        </nav>
    )
}

export default Navbar
