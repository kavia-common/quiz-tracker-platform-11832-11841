import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ variant = 'primary', size = 'md', className = '', children, ...rest }) {
  /** Themed button */
  const classes = ['btn', `btn-${variant}`, `btn-${size}`, className].join(' ').trim();
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
