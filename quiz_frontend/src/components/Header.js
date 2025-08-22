import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// PUBLIC_INTERFACE
export default function Header() {
  /** Top navigation header with brand and auth actions */
  const { user, logout } = useAuth();

  return (
    <header className="app-header">
      <div className="brand">
        <Link to="/" className="brand-link">
          <span className="brand-logo">Q</span>
          <span className="brand-name">Quiz Tracker</span>
        </Link>
      </div>

      <nav className="nav">
        <NavLink to="/" end className="nav-link">
          Home
        </NavLink>
        <NavLink to="/quizzes" className="nav-link">
          Quizzes
        </NavLink>
        <NavLink to="/results" className="nav-link">
          Results
        </NavLink>
      </nav>

      <div className="header-actions">
        {user ? (
          <>
            <span className="user-email" title={user.email}>{user.email}</span>
            <button className="btn btn-secondary" onClick={logout} aria-label="Log out">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">Login</Link>
        )}
      </div>
    </header>
  );
}
