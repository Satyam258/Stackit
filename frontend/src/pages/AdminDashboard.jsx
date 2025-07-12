import { useEffect, useState } from 'react'
import { api } from '../api/axios'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    if (user && user.role !== 'admin') {
    navigate('/')
  }

    const fetchQuestions = async () => {
      try {
        const res = await api.get('/admin/questions')
        setQuestions(res.data)
      } catch (err) {
        console.error("Admin fetch failed", err)
      }
    }

    fetchQuestions()
  }, [user])

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/questions/${id}`)
      setQuestions(questions.filter(q => q._id !== id))
    } catch (err) {
      alert("Failed to delete question")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin – Manage Questions</h1>
      {questions.map((q) => (
        <div key={q._id} className="border p-4 rounded mb-3">
          <h2 className="font-semibold">{q.title}</h2>
          <p className="text-sm text-gray-600">{q.author?.username}</p>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => handleDelete(q._id)}
              className="text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
            {/* Add edit, hide, etc. later */}
          </div>
        </div>
      ))}
    </div>
  )
}

export default AdminDashboard
