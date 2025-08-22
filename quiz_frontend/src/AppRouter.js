import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Quizzes from './pages/Quizzes';
import QuizDetail from './pages/QuizDetail';
import Results from './pages/Results';
import { useAuth } from './contexts/AuthContext';

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Application routes with protected paths */
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/quizzes"
        element={
          <RequireAuth>
            <Quizzes />
          </RequireAuth>
        }
      />
      <Route
        path="/quizzes/:quizId"
        element={
          <RequireAuth>
            <QuizDetail />
          </RequireAuth>
        }
      />
      <Route
        path="/results"
        element={
          <RequireAuth>
            <Results />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function RequireAuth({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();
  if (initializing) return null;
  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
