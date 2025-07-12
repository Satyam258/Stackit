import { useEffect, useRef, useState } from 'react'
import { Bell } from 'lucide-react'
import { api } from '../api/axios'
import { Link } from 'react-router-dom'

function NotificationDropdown() {
    const [open, setOpen] = useState(false)
    const [notifications, setNotifications] = useState([])
    const dropdownRef = useRef(null)

    // Fake API Call (Replace  backend later)
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const res = await api.get('/notifications/me')
                setNotifications(res.data || [])
            } catch (err) {
                console.error("Failed to fetch notifications", err)
            }
        }

        fetchNotifications()
    }, [])

    // Close dropdown when clicked outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const unreadCount = notifications.filter(n => !n.isRead).length

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Bell Icon */}
            <button onClick={() => setOpen(!open)} className="relative">
                <Bell className={`w-6 h-6 ${unreadCount ? "animate-bounce text-red-600" : "text-gray-800"}`} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                        {unreadCount}
                    </span>
                )}
            </button>


            {/* Dropdown */}
            {open && (
                <div className="absolute right-0 mt-2 w-72 bg-white border shadow-md rounded z-50">
                    <div className="p-2 border-b text-sm font-semibold">Notifications</div>
                    {notifications.length === 0 ? (
                        <div className="p-4 text-sm text-gray-500">No new notifications</div>
                    ) : (
                        <ul className="max-h-60 overflow-y-auto">
                            {notifications.map((notif) => (
                                <li key={notif._id} className="px-4 py-2 hover:bg-gray-50 text-sm">
                                    <Link to={notif.link} className="block text-blue-700">
                                        {notif.message}
                                    </Link>
                                    <div className="text-xs text-gray-400">
                                        {new Date(notif.createdAt).toLocaleString()}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}

export default NotificationDropdown
