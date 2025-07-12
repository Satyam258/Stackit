import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/axios'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/auth/login', { email, password })
      login(res.data.user) // store user in context
      navigate('/')
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <div className="flex justify-center items-center">
      <h2 className="text-xl font-bold mb-4">LOGIN</h2>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className=" focus:border-sky-500 focus:outline
          focus:outline-sky-500 focus:invalid:border-pink-500
          focus:invalid:outline-pink-500 disabled:border-gray-200
          disabled:bg-gray-50 disabled:text-gray-500 disabled:shadow-none
          dark:disabled:border-gray-700 dark:disabled:bg-gray-800/20
          w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-center items-center">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          LOGIN
        </button>
        </div>
      </form>
    </div>
  )
}

export default Login
