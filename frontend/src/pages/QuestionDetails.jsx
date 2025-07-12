import React from 'react'
import AnswerCard from '../components/AnswerCard'

const QuestionDetails = () => {

    const sampleAnswer = {
    _id: "answer123",
    text: "<p>This is a <strong>sample answer</strong> with <em>rich text</em>.</p>",
    createdAt: new Date(),
    author: { username: "Satyam258" },
    upvotes: ["u1", "u2"],
    downvotes: []
  }

  return (
    <div className='space-y-4 mt-6'>
        <AnswerCard
        answer={sampleAnswer}
        onUpvote={(id) => console.log("Upvote", id)}
        onDownvote={(id) => console.log("Downvote", id)}
        onAccept={(id) => console.log("Accept", id)}
        isAccepted={true}
        isOwner={true}
        />
    </div>
  )
}

export default QuestionDetails