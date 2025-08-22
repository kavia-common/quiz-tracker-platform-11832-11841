import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { useNavigate, useLocation } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function Login() {
  /** Login page with simple form */
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setError('');
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(form);
      const redirect = location.state?.from || '/';
      navigate(redirect, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page page-center">
      <Card title="Welcome back">
        <form onSubmit={handleSubmit} className="form">
          <label className="form-label">
            Email
            <input
              type="email"
              name="email"
              className="input"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>
          <label className="form-label">
            Password
            <input
              type="password"
              name="password"
              className="input"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>
          {error && <div className="alert alert-error">{error}</div>}
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>
      </Card>
    </div>
  );
}
