import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ensureAnonymousUser } from './services/auth.api';
import { useTrackerStore } from './stores/useTrackerStore';

async function initializeApp() {
  try {
    const user = await ensureAnonymousUser();
    console.log('Anonymous user:', user.id);
    if (user?.id) {
      useTrackerStore.getState().setAnonymousUserId(user.id);
    }
  } catch (error) {
    console.error('Failed to initialize anonymous session:', error);
  }

  // Load live signals from Supabase database
  await useTrackerStore.getState().loadSignals();

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

initializeApp();

