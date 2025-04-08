import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';

import Home from './pages/Home';
import BlogDetails from './pages/BlogDetails';
import BlogManagement from './pages/BlogManagement';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyBlogs from './pages/MyBlogs';
import MyPersonalDiary from './pages/MyPersonalDiary';
import SavedBlogs from './pages/SavedBlogs';
import Header from './components/Header';
import Footer from './components/Footer';
import SessionExpiredModal from './components/SessionExpiredModal'; 

const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [wasAuthenticated] = useState(!!token);

  const isAuthPage = location.pathname === '/' || location.pathname === '/signup';

  useEffect(() => {
    if (wasAuthenticated && !token) {
      setShowSessionModal(true);
    }
  }, [token, wasAuthenticated]);

  const handleSessionModalConfirm = () => {
    setShowSessionModal(false);
    navigate('/');
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: { textAlign: 'left' },
        }}
      />

      {!isAuthPage && (
        <div className="fixed top-0 left-0 w-full z-10 bg-white shadow-sm">
          <Header />
        </div>
      )}

      <div className={`${!isAuthPage ? 'pt-20' : ''} flex-1`}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blog-management" element={<BlogManagement />} />
          <Route path="/blog-management/:id" element={<BlogManagement />} />
          <Route path="/my-blogs" element={<MyBlogs />} />
          <Route path="/my-personal-dairy" element={<MyPersonalDiary />} />
          <Route path="/saved-blogs" element={<SavedBlogs />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      {!isAuthPage && <Footer />}
      {showSessionModal && <SessionExpiredModal onConfirm={handleSessionModalConfirm} />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
