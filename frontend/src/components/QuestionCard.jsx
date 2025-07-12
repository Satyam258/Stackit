import { MessageCircle, ThumbsUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import "@fontsource/poppins"

function QuestionCard({ question }) {
  return (
    <div className="border p-4 rounded-lg shadow-sm  hover:shadow-md transition-all duration-200 bg-gray-200">
      {/* Title */}
      <Link to={`/question/${question._id}`}>
        <h2 className="text-lg font-semibold text-black hover:underline" style={{fontFamily:"serif"}}>
          {question.title}
        </h2>
      </Link>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 my-2">
        {question.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 line-clamp-2">{question.description}</p>

      {/* Footer*/}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
        <span>By {question.author?.username || "Unknown"}</span>
        <div className="flex gap-4 items-center">
          <span className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4" />
            {question.upvotes?.length || 0}
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            {question.answerCount || 0}
          </span>
        </div>
      </div>
    </div>
  )
}

export default QuestionCard
