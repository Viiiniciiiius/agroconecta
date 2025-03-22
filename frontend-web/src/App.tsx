import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import CreateSolutionPage from './pages/CreateSolutionPage';
import './App.css'

/**
 * Creates a react-router-dom browser router with the routes of the application.
 * @type BrowserRouter
 */
const Router: React.FC = () => { 
  return(
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/storage-solution" element={<CreateSolutionPage />} />
    </Routes>
  )
}
/**
 * The main application component.
 * @component
 */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;