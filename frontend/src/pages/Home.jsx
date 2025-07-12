import QuestionCard from "../components/QuestionCard"

const sampleQuestion = {
  _id: "1",
  title: "How to use React Context for global state?",
  tags: ["React", "ContextAPI"],
  description: "I’m building a StackIt Question plateform and wondering how to manage auth state globally",
  author: { username: "Satyam258" },
  upvotes: ["user1", "user2", "user3"],
  answerCount: 2
}

function Home() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <QuestionCard question={sampleQuestion} />
    </div>
  )
}

export default Home
