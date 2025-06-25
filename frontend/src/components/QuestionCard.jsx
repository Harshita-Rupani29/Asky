export default function QuestionCard({ question }) {
  return (
    <div className="bg-white border border-[#e0e0e0] rounded-lg p-5 mb-4 flex justify-between items-center shadow-sm hover:shadow transition duration-200">
      <div>
        <h4 className="text-md font-semibold text-[#2f3542]">{question.title}</h4>
        <p className="text-sm text-[#8395a7] mt-1">{question.answers} answers</p>
      </div>
      <div className="flex items-center gap-1 text-green-600 text-sm font-medium bg-[#f1f2f6] px-2 py-1 rounded shadow-sm">
        <span role="img" aria-label="thumbs up">👍</span> {question.votes}
      </div>
    </div>
  );
}
