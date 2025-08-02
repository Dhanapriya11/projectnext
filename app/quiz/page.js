'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const questions = [
  {
    question: 'What is the capital of India?',
    options: ['Delhi', 'Mumbai', 'Chennai', 'Kolkata'],
    answer: 'Delhi',
  },
  {
    question: 'Which planet is largest?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    answer: 'Jupiter',
  },
  {
    question: 'Who wrote the play "Romeo and Juliet"?',
    options: ['William Shakespeare', 'Charles Dickens', 'Jane Austen', 'Mark Twain'],
    answer: 'William Shakespeare',
  },
  {
    question: 'What is the boiling point of water?',
    options: ['90°C', '100°C', '80°C', '120°C'],
    answer: '100°C',
  },
];

export default function Quiz() {
  const [answers, setAnswers] = useState({});
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return; // Wait for session to load
    if (!session) router.push('/'); // Redirect to home/login if not authenticated
  }, [session, status,router]);

  const handleOptionChange = (index, option) => {
    setAnswers({ ...answers, [index]: option });
  };

  const handleSubmit = async () => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.answer) score++;
    });
    localStorage.setItem('score', score);
    localStorage.setItem('userAnswers', JSON.stringify(answers));
    localStorage.setItem('questions', JSON.stringify(questions));

    // Send score to backend
    await fetch('/api/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ score })
    });

    router.push('/result');
  };

  if (status === 'loading') {
    return <div className="container"><h2>Loading...</h2></div>;
  }

  if (!session) {
    return null; // Or a message if you want
  }

  return (
    <div className="container">
      <h1>Quiz</h1>
      {questions.map((q, i) => (
        <div key={i} style={{ marginBottom: '20px' }}>
          <h3>{q.question}</h3>
          {q.options.map((opt, j) => (
            <div key={j}>
              <input
                type="radio"
                name={`q${i}`}
                value={opt}
                checked={answers[i] === opt}
                onChange={() => handleOptionChange(i, opt)}
              />
              {opt}
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
