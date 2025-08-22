import React, { useEffect } from 'react';
import './App.css';
import { applyThemeToDocument, LIGHT_THEME } from './theme';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './AppRouter';

/**
 * PUBLIC_INTERFACE
 * App is the main layout wrapper: header, sidebar (in pages where needed), main content, footer.
 * It also applies the theme variables.
 */
function App() {
  useEffect(() => {
    applyThemeToDocument(LIGHT_THEME);
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="app-root">
          <Header />
          <main className="app-main">
            <AppRouter />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
