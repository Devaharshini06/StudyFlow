import React from 'react';
import { createRoot } from 'react-dom/client';
import PlannerApp from './components/PlannerApp/PlannerApp.jsx';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlannerApp />
  </React.StrictMode>,
);