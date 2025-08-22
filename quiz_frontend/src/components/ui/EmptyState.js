import React from 'react';

// PUBLIC_INTERFACE
export default function EmptyState({ title = 'Nothing here', description = '', action }) {
  /** Empty state display with optional action */
  return (
    <div className="empty-state">
      <h3>{title}</h3>
      {description && <p className="muted">{description}</p>}
      {action}
    </div>
  );
}
