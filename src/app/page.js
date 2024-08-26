'use client';
import React, { useState, useEffect } from 'react';
import Home from './components/home';
import Login from './components/login';
import Signup from './components/signup';

const MainPage = () => {
  const [userId, setUserId] = useState(null);
  const [view, setView] = useState('login');

  useEffect(() => {
    // Check if user ID exists in localStorage
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
      setView('home');
    } else {
      setView('login');
    }
  }, []);

  const handleLogin = (id) => {
    localStorage.setItem('user_id', id);
    setUserId(id);
    setView('home');
  };

  const handleSignup = () => {
    setView('signup');
  };

  const handleSignupSuccess = () => {
    setView('login');
  };

  const handleLogout = () => {
    localStorage.removeItem('user_id');
    setUserId(null);
    setView('login');
  };

  if (view === 'home') {
    return <Home userId={userId} onLogout={handleLogout} />;
  }

  return view === 'signup' ? (
    <Signup onSignupSuccess={handleSignupSuccess} onClose={() => setView('login')} />
  ) : (
    <Login onLogin={handleLogin} onSignup={handleSignup} />
  );
};

export default MainPage;
