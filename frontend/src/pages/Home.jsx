import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';

const sampleQuestions = [
  { title: 'How to center a div with CSS?', answers: 2, votes: 15 },
  { title: 'What is the use of useState in React?', answers: 5, votes: 23 },
  { title: 'How do I fetch data in Node.js?', answers: 3, votes: 10 },
  { title: 'Tips for writing clean JavaScript code?', answers: 4, votes: 8 },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      <Header />
      <div className="flex px-10 py-8 gap-8">
        <Sidebar />
        <main className="flex-1">
          <h2 className="text-xl font-semibold text-[#2f3542] mb-6">Recent Questions</h2>
          {sampleQuestions.map((q, i) => (
            <QuestionCard key={i} question={q} />
          ))}
        </main>
      </div>
    </div>
  );
}
