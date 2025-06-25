import { Link } from "react-router-dom";
export default function Sidebar() {
  return (
    <aside className="bg-[#eaf9e5] p-6 w-64 min-h-[60vh] rounded-lg shadow-sm flex flex-col items-start border border-[#dfe4ea]">
      <h3 className="text-md font-bold text-[#2f3542] mb-4">Filter by Tags</h3>
      <div className="flex flex-col gap-3 mb-6 w-full">
        {['JavaScript', 'CSS', 'React', 'Node.js', 'HTML'].map(tag => (
          <label
            key={tag}
            className="flex items-center gap-2 text-sm text-[#576574] font-medium cursor-pointer hover:text-[#2f3542] transition-colors"
          >
            <input
              type="checkbox"
              className="accent-[#2f3542] w-4 h-4"
            />
            {tag}
          </label>
        ))}
      </div>
       <Link
        to="/newQuestion"
       className="w-full bg-[#a3d9a5] text-[#2f3542] font-medium py-2 rounded-md hover:bg-[#8fc28f] transition-all duration-150 mt-auto text-center">
        Ask a Question
      </Link>
    </aside>
  );
}
