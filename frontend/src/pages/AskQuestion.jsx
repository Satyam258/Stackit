import { useState } from 'react'
import { useQuill } from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import Select from 'react-select'
import { api } from '../api/axios'
import { useNavigate } from 'react-router-dom'

const tagOptions = [
  { value: 'React', label: 'React' },
  { value: 'JWT', label: 'JWT' },
  { value: 'Node.js', label: 'Node.js' },
  { value: 'MongoDB', label: 'MongoDB' }
]

function AskQuestion() {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState([])
  const { quill, quillRef } = useQuill()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!quill) return

    const payload = {
      title,
      description: quill.root.innerHTML,
      tags: tags.map(tag => tag.value),
    }

    try {
      const res = await api.post('/questions', payload)
      navigate(`/question/${res.data._id}`)
    } catch (err) {
      console.error(err)
      alert('Error posting question')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4" style={{fontFamily:"sans-serif"}}>Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Question Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Rich Text Editor */}
        <div className="bg-white border rounded">
          <div ref={quillRef} style={{ height: 200 }} />
        </div>

        {/* Tags */}
        <Select
          isMulti
          options={tagOptions}
          onChange={setTags}
          className="mt-4"
          placeholder="Select relevant tags"
        />
        <div className="flex justify-center items-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Submit Question
        </button>
        </div>
      </form>
    </div>
  )
}

export default AskQuestion
