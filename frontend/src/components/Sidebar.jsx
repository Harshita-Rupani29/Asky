export default function Sidebar() {
  return (
    <aside className="bg-green-50 p-6 w-64 min-h-[60vh] rounded-2xl shadow-lg flex flex-col items-start">
      <h3 className="text-xl font-bold text-green-800 mb-4">Filter by Tags</h3>
      <div className="flex flex-col gap-3 mb-6 w-full">
        {['JavaScript', 'CSS', 'React', 'Node.js', 'HTML'].map(tag => (
          <label key={tag} className="flex items-center gap-2 text-green-700 font-medium cursor-pointer hover:text-green-900 transition-colors">
            <input
              type="checkbox"
              className="accent-green-500 w-4 h-4 rounded focus:ring-2 focus:ring-green-300"
            />
            {tag}
          </label>
        ))}
      </div>
      <button className="w-full bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold py-2 rounded-lg shadow hover:from-green-500 hover:to-green-700 transition-all duration-150 mt-auto">
        Ask a Question
      </button>
    </aside>
  );
}