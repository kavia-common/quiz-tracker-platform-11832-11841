import React from 'react';

// PUBLIC_INTERFACE
export default function Footer() {
  /** Simple footer */
  return (
    <footer className="app-footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} Quiz Tracker</span>
        <span className="muted">Built with React</span>
      </div>
    </footer>
  );
}
