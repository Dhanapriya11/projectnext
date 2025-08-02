'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function Result() {
  const [score, setScore] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const s = localStorage.getItem('score');
    const ua = localStorage.getItem('userAnswers');
    const qs = localStorage.getItem('questions');
    if (s !== null && ua && qs) {
      setScore(s);
      setUserAnswers(JSON.parse(ua));
      setQuestions(JSON.parse(qs));
    } else {
      router.push('/quiz');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="container">
      <h1>Result</h1>
      <h2>Your Score: {score}</h2>
      <div style={{ marginTop: '30px' }}>
        {questions.map((q, i) => {
          const userAnswer = userAnswers[i];
          const isCorrect = userAnswer === q.answer;
          return (
            <div key={i} style={{ marginBottom: '20px' }}>
              <h3>{q.question}</h3>
              <p>Your answer: <b style={{ color: isCorrect ? 'green' : 'red' }}>{userAnswer || 'No answer'}</b></p>
              {!isCorrect && (
                <p>Correct answer: <b style={{ color: 'green' }}>{q.answer}</b></p>
              )}
            </div>
          );
        })}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
