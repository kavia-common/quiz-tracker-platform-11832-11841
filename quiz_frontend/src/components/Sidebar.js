import React, { useEffect, useState } from 'react';
import { apiGetCategories } from '../services/api';

// PUBLIC_INTERFACE
export default function Sidebar({ selected, onSelect }) {
  /** Sidebar shows quiz categories */
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let run = true;
    (async () => {
      const cats = await apiGetCategories();
      if (run) setCategories(cats);
    })();
    return () => {
      run = false;
    };
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Categories</h3>
      <ul className="category-list">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              className={`category-item ${selected === cat.id ? 'active' : ''}`}
              onClick={() => onSelect(cat.id)}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
