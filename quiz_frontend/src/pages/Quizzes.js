import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';
import { apiGetQuizzes } from '../services/api';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Quizzes() {
  /** Quizzes listing page with category sidebar */
  const [category, setCategory] = useState('all');
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async (cat) => {
    setLoading(true);
    try {
      const data = await apiGetQuizzes(cat);
      setQuizzes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="layout">
      <Sidebar selected={category} onSelect={setCategory} />
      <main className="content">
        <h2 className="page-title">Quizzes</h2>
        {loading ? (
          <Loader label="Fetching quizzes..." />
        ) : quizzes.length === 0 ? (
          <EmptyState title="No quizzes found" description="Try a different category." />
        ) : (
          <div className="grid grid-3">
            {quizzes.map((q) => (
              <Card
                key={q.id}
                title={q.title}
                footer={
                  <Link to={`/quizzes/${q.id}`}>
                    <Button>Start Quiz</Button>
                  </Link>
                }
              >
                <p className="muted small">{q.category.toUpperCase()}</p>
                <p>{q.description}</p>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
