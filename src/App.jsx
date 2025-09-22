import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './pages/DashboardPage';
import AddUserPage from './pages/AddUserPage';
import EditUserPage from './pages/EditUserPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
 <>
 
            <Routes>
      {/* MainLayout parent hoga */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="add" element={<AddUserPage />} />
        <Route path="edit/:id" element={<EditUserPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
 </>
          
   
  );
}

export default App;