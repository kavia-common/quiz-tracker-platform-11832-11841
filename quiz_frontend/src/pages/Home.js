import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { Link } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Home() {
  /** Home page with quick actions */
  return (
    <div className="page">
      <div className="grid grid-2">
        <Card title="Take a Quiz" footer={<Link to="/quizzes"><Button>Browse Quizzes</Button></Link>}>
          <p>Choose from various categories and test your knowledge.</p>
        </Card>
        <Card title="View Results" footer={<Link to="/results"><Button variant="secondary">See Results</Button></Link>}>
          <p>Track your progress and review your score history.</p>
        </Card>
      </div>
    </div>
  );
}
