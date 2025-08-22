import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { apiGetQuizById, apiSubmitQuiz } from '../services/api';
import Loader from '../components/ui/Loader';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

// PUBLIC_INTERFACE
export default function QuizDetail() {
  /** Quiz taking page */
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let run = true;
    (async () => {
      try {
        const q = await apiGetQuizById(quizId);
        if (run) {
          setQuiz(q);
          setAnswers(Array(q.questions.length).fill(null));
        }
      } catch (e) {
        setError('Could not load quiz.');
      } finally {
        if (run) setLoading(false);
      }
    })();
    return () => {
      run = false;
    };
  }, [quizId]);

  const allAnswered = useMemo(
    () => answers.every((a) => a !== null && a !== undefined),
    [answers]
  );

  const selectAnswer = (qIdx, optionIdx) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[qIdx] = optionIdx;
      return next;
    });
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const result = await apiSubmitQuiz({ quizId, answers });
      navigate('/results', { state: { latest: result } });
    } catch (e) {
      setError('Submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="page"><Loader label="Loading quiz..." /></div>;
  if (error) return <div className="page"><Card title="Error"><p>{error}</p></Card></div>;
  if (!quiz) return null;

  return (
    <div className="page">
      <div className="quiz-header">
        <h2>{quiz.title}</h2>
        <Link to="/quizzes" className="link">Back to all quizzes</Link>
      </div>
      <div className="stack">
        {quiz.questions.map((q, qIdx) => (
          <Card key={q.id} title={`Q${qIdx + 1}. ${q.text}`}>
            <div className="options">
              {q.options.map((opt, oIdx) => {
                const selected = answers[qIdx] === oIdx;
                return (
                  <button
                    key={oIdx}
                    className={`option ${selected ? 'selected' : ''}`}
                    onClick={() => selectAnswer(qIdx, oIdx)}
                    aria-pressed={selected}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </Card>
        ))}
      </div>
      <div className="quiz-actions">
        <Button variant="secondary" onClick={() => navigate('/quizzes')}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!allAnswered || submitting}>
          {submitting ? 'Submitting...' : 'Submit Answers'}
        </Button>
      </div>
    </div>
  );
}
