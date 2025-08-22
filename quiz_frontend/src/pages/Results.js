import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { apiGetHistory } from '../services/api';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import EmptyState from '../components/ui/EmptyState';

// PUBLIC_INTERFACE
export default function Results() {
  /** Results page shows latest (if any) and history */
  const location = useLocation();
  const latestFromNav = location.state?.latest || null;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let run = true;
    (async () => {
      const h = await apiGetHistory();
      if (run) setHistory(h);
      setLoading(false);
    })();
    return () => { run = false; };
  }, []);

  return (
    <div className="page">
      <h2 className="page-title">Results</h2>
      {latestFromNav && (
        <Card title="Latest Result">
          <p><strong>{latestFromNav.quizTitle}</strong></p>
          <p>Score: {latestFromNav.score}% ({latestFromNav.correct}/{latestFromNav.total})</p>
          <p className="muted small">Taken at {new Date(latestFromNav.date).toLocaleString()}</p>
        </Card>
      )}
      <div className="stack">
        <h3>History</h3>
        {loading ? (
          <Loader label="Loading history..." />
        ) : history.length === 0 ? (
          <EmptyState title="No results yet" description="Take a quiz to see your results here." />
        ) : (
          <div className="timeline">
            {history.map((r) => (
              <div key={r.id} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-content">
                  <div className="timeline-title">
                    <strong>{r.quizTitle}</strong>
                    <span className={`badge ${r.score >= 70 ? 'badge-success' : 'badge-warn'}`}>
                      {r.score}%
                    </span>
                  </div>
                  <div className="muted small">
                    {new Date(r.date).toLocaleString()} — {r.correct}/{r.total} correct
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
