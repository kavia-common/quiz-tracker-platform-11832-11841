import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, children, footer, className = '' }) {
  /** Simple card container */
  return (
    <div className={`card ${className}`}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
}
