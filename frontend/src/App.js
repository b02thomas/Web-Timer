import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { NotificationProvider } from './contexts/NotificationContext';
import IntervalTimer from './components/IntervalTimer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="App min-h-screen bg-background text-foreground transition-colors duration-300">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<IntervalTimer />} />
            </Routes>
          </BrowserRouter>
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;