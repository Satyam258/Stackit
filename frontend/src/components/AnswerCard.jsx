import { ThumbsUp, ThumbsDown, CheckCircle } from 'lucide-react'
import parse from 'html-react-parser'
import classNames from 'classnames'

function AnswerCard({ answer, onUpvote, onDownvote, onAccept, isAccepted, isOwner }) {
  return (
    <div
      className={classNames(
        "border p-4 rounded-md shadow-sm bg-white",
        isAccepted && "border-green-500"
      )}
    >
      {/* Author and Timestamp */}
      <div className="flex justify-between items-center mb-2 text-sm text-gray-500">
        <span>By {answer.author?.username || 'Unknown'}</span>
        <span>{new Date(answer.createdAt).toLocaleString()}</span>
      </div>

      {/* Answer Text */}
      <div className="prose max-w-none text-gray-800 text-sm mb-4">
        {parse(answer.text)}
      </div>

      {/* Bottom  */}
      <div className="flex justify-between items-center">
        {/* Upvote or downvote */}
        <div className="flex items-center gap-4 text-gray-600">
          <button onClick={() => onUpvote(answer._id)} className="flex items-center gap-1 hover:text-blue-600">
            <ThumbsUp className="w-4 h-4" /> {answer.upvotes?.length || 0}
          </button>
          <button onClick={() => onDownvote(answer._id)} className="flex items-center gap-1 hover:text-red-600">
            <ThumbsDown className="w-4 h-4" /> {answer.downvotes?.length || 0}
          </button>
        </div>

        {/* Accept Answer */}
        {isOwner && !isAccepted && (
          <button
            onClick={() => onAccept(answer._id)}
            className="text-green-600 hover:underline flex items-center gap-1"
          >
            <CheckCircle className="w-4 h-4" /> Mark as Accepted
          </button>
        )}

        {/* Accepted Badge */}
        {isAccepted && (
          <span className="text-green-600 font-semibold flex items-center gap-1">
            <CheckCircle className="w-4 h-4" /> Accepted Answer
          </span>
        )}
      </div>
    </div>
  )
}

export default AnswerCard
