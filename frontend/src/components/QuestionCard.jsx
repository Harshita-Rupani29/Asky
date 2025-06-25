export default function QuestionCard({ question }) {
  return (
    <div className="bg-white border border-green-100 rounded-xl p-6 mb-4 flex justify-between items-center shadow-md hover:shadow-xl transition-shadow duration-200">
      <div>
        <h4 className="text-lg font-bold text-green-800 mb-1">{question.title}</h4>
        <p className="text-sm text-green-600">{question.answers} answers</p>
      </div>
      <div className="flex items-center gap-2 text-green-700 font-semibold text-lg bg-green-50 px-3 py-1 rounded-lg shadow-sm">
        <span role="img" aria-label="thumbs up">👍</span> {question.votes}
      </div>
    </div>
  );
}