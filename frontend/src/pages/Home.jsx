import Sidebar from '../components/Sidebar';
import QuestionCard from '../components/QuestionCard';

const questions = [
  { title: 'How to center a div with CSS?', answers: 2, votes: 15 },
  { title: 'What is the use of useState in React?', answers: 5, votes: 23 },
  { title: 'How do I fetch data in Node.js?', answers: 3, votes: 10 },
  { title: 'Tips for writing clean JavaScript code?', answers: 4, votes: 8 },
];

export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={{ padding: '2rem', flex: 1 }}>
        <h3 style={{ marginBottom: '1rem' }}>Recent Questions</h3>
        {questions.map((q, i) => <QuestionCard key={i} question={q} />)}
      </main>
    </div>
  );
}
