import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookText, Menu, X, Plus } from 'lucide-react';
import DefaultProfile from '../assets/default_profile.jpg';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState(null); // ⬅ user now state
  const dropdownRef = useRef(null);
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleProfile = () => setProfileOpen(!profileOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) setUser(storedUser);
  }, []); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  if (!user) return null;

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between relative z-50">
      <div className="flex items-center justify-between w-full md:hidden">
        <button onClick={toggleMenu} className="text-gray-700">
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <div className="flex-1 text-center text-xl font-semibold text-black">
          <Link to="/home">BlogNest</Link>
        </div>
        <div className="w-6" />
      </div>

      <div className="hidden md:flex items-center gap-4 text-gray-800 text-xs">
        <Link
          to="/my-personal-dairy"
          className={`flex items-center gap-2 px-2 py-1 border rounded-full transition ${currentPath === '/my-personal-dairy'
            ? 'text-yellow-600 border-yellow-600 font-medium'
            : 'text-gray-800 border-black hover:text-yellow-600 hover:border-yellow-600'
            }`}
        >
          <BookText className="w-4 h-4" />
          Personal Diary
        </Link>
      </div>

      <div className="hidden md:flex text-xl font-medium text-black tracking-wide">
        <Link to="/home">BlogNest</Link>
      </div>

      <div className="hidden md:flex items-center gap-6 text-gray-800 text-sm">
        <Link
          to="/home"
          className={`hover:text-yellow-600 ${currentPath === '/home' ? 'text-yellow-600 font-medium' : ''
            }`}
        >
          Home
        </Link>
        <Link
          to="/my-blogs"
          className={`hover:text-yellow-600 ${currentPath === '/my-blogs' ? 'text-yellow-600 font-medium' : ''
            }`}
        >
          My Blogs
        </Link>
        <Link
          to="/saved-blogs"
          className={`hover:text-yellow-600 ${currentPath === '/saved-blogs' ? 'text-yellow-600 font-medium' : ''
            }`}
        >
          Saved Blogs
        </Link>

        <Link
          to="/blog-management"
          className="bg-yellow-600 text-white text-sm px-4 py-2 rounded hover:bg-yellow-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Blog
        </Link>

        <div className="relative">
          <button onClick={toggleProfile}>
            <img
              src={user.profile_pic || DefaultProfile}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border-2 border-yellow-600"
            />
          </button>

          {profileOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg border z-50 text-sm overflow-hidden text-left"
            >
              <div className="px-4 pt-3 pb-1 text-gray-500 text-xs uppercase tracking-wide">Profile</div>
              <Link to="#" className="block px-4 py-3 hover:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div>
                      <span className="text-gray-500 text-xs mr-1">Username:</span>
                      <span className="text-gray-800 font-medium">{user.full_name}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-xs mr-1">Email:</span>
                      <span className="text-gray-700 text-xs">{user.email}</span>
                    </div>
                  </div>
                </div>
              </Link>
              <hr className="my-1 bg-gray-300" />
              <div className="px-4 pt-2 pb-1 text-gray-500 text-xs uppercase tracking-wide">Blogs</div>
              <Link to="/blog-management" className="block pl-6 pr-4 py-2 hover:bg-gray-100 text-gray-700">
                Create Blog
              </Link>
              <Link to="/my-blogs" className="block pl-6 pr-4 py-2 hover:bg-gray-100 text-gray-700">
                My Blogs
              </Link>
              <Link to="/saved-blogs" className="block pl-6 pr-4 py-2 hover:bg-gray-100 text-gray-700">
                Saved Blogs
              </Link>
              <Link to="/my-personal-dairy" className="block pl-6 pr-4 py-2 hover:bg-gray-100 text-gray-700">
                Personal Diary
              </Link>
              <div className="px-4 pt-3 pb-1 text-gray-500 text-xs uppercase tracking-wide">Account</div>
              <button
                onClick={handleLogout}
                className="block w-full text-left pl-6 pr-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-screen w-full max-w-xs bg-white shadow-lg border-r z-50 overflow-y-auto transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full p-6 text-gray-800 text-sm relative space-y-2 text-left pb-16">
          <button onClick={toggleMenu} className="absolute top-4 right-4 text-gray-600 hover:text-black">
            <X className="w-5 h-5" />
          </button>

          <div className="text-xl font-bold text-center py-4">BlogNest</div>
          <hr className="my-2 border-t border-yellow-300" />

          <Link
            to="/home"
            onClick={toggleMenu}
            className={`pl-4 py-1 transition-colors duration-200 ${currentPath === '/home' ? 'text-yellow-600 font-medium' : 'hover:text-yellow-600'
              }`}
          >
            Home
          </Link>

          <hr className="my-2 border-t border-yellow-300" />

          <div className="text-xs text-gray-500 uppercase tracking-wide pt-2">Blogs</div>
          <Link
            to="/blog-management"
            onClick={toggleMenu}
            className={`pl-4 py-1 transition-colors duration-200 ${currentPath === '/blog-management' ? 'text-yellow-600 font-medium' : 'hover:text-yellow-600'
              }`}
          >
            Create Blog
          </Link>
          <Link
            to="/my-blogs"
            onClick={toggleMenu}
            className={`pl-4 py-1 transition-colors duration-200 ${currentPath === '/my-blogs' ? 'text-yellow-600 font-medium' : 'hover:text-yellow-600'
              }`}
          >
            My Blogs
          </Link>
          <Link
            to="/saved-blogs"
            onClick={toggleMenu}
            className={`pl-4 py-1 transition-colors duration-200 ${currentPath === '/saved-blogs' ? 'text-yellow-600 font-medium' : 'hover:text-yellow-600'
              }`}
          >
            Saved Blogs
          </Link>
          <Link
            to="/my-personal-dairy"
            onClick={toggleMenu}
            className={`pl-4 py-1 transition-colors duration-200 ${currentPath === '/my-personal-dairy' ? 'text-yellow-600 font-medium' : 'hover:text-yellow-600'
              }`}
          >
            Personal Diary
          </Link>

          <hr className="my-2 border-t border-yellow-300" />

          <div className="text-xs text-gray-500 uppercase tracking-wide pt-2">Account</div>
          <Link to="#" onClick={toggleMenu} className="pl-4 py-1 hover:text-yellow-600 transition-colors duration-200">
            Profile
          </Link>
          <button
            onClick={() => {
              toggleMenu();
              handleLogout();
            }}
            className="pl-4 py-1 text-red-500 hover:text-red-700 text-left transition-colors duration-200"
          >
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;
