import React from 'react';
import { BrowserRouter as Router, Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from "react-router-dom";
import DashboardPage from './pages/DashboardPage';
import './App.css'

/**
 * Creates a react-router-dom browser router with the routes of the application.
 * @type BrowserRouter
 */
const router = createBrowserRouter(
  createRoutesFromElements(
  <Router>
    <Route path="/" element={<DashboardPage />} />
    <Route path="/storage-solution" element={<DashboardPage />} />
  </Router>
  )
);
/**
 * The main application component.
 * @component
 */
export const App: React.FC = () => {
  return (
    <RouterProvider router={router} />
  );
};