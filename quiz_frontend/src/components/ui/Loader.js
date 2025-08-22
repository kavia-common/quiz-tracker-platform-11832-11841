import React from 'react';

// PUBLIC_INTERFACE
export default function Loader({ label = 'Loading...' }) {
  /** Loading indicator */
  return (
    <div className="loader">
      <div className="spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
