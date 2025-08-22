/**
 * Authentication context: holds current user and actions.
 */
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { apiGetCurrentUser, apiLogin, apiLogout } from '../services/api';

const AuthContext = createContext(null);

// PUBLIC_INTERFACE
export const useAuth = () => {
  /** Hook to access auth context */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  /** Provide user, loading and actions state to children */
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const cur = await apiGetCurrentUser();
        if (active) setUser(cur);
      } finally {
        if (active) setInitializing(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const login = async (credentials) => {
    const u = await apiLogin(credentials);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await apiLogout();
    setUser(null);
  };

  const value = useMemo(() => ({ user, initializing, login, logout }), [user, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
