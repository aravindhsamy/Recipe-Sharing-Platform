import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat as Chef, Home, BookOpen, PlusCircle, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      {/* Navigation Header */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg group-hover:scale-105 transition-transform">
                <Chef className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                RecipeShare
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <NavLink to="/" icon={<Home className="w-4 h-4" />} label="Home" isActive={isActive('/')} />
              <NavLink to="/recipes" icon={<BookOpen className="w-4 h-4" />} label="Recipes" isActive={isActive('/recipes')} />
              {user && (
                <NavLink to="/add-recipe\" icon={<PlusCircle className="w-4 h-4" />} label="Add Recipe" isActive={isActive('/add-recipe')} />
              )}
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/profile"
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/60 hover:bg-white/80 backdrop-blur-sm transition-all duration-200 border border-white/20"
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                  </Link>
                  <button
                    onClick={logout}
                    className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-t border-white/20">
        <div className="flex justify-around items-center h-16 px-4">
          <MobileNavLink to="/" icon={<Home className="w-5 h-5" />} label="Home" isActive={isActive('/')} />
          <MobileNavLink to="/recipes" icon={<BookOpen className="w-5 h-5" />} label="Recipes" isActive={isActive('/recipes')} />
          {user && (
            <MobileNavLink to="/add-recipe\" icon={<PlusCircle className="w-5 h-5" />} label="Add" isActive={isActive('/add-recipe')} />
          )}
          <MobileNavLink to={user ? "/profile" : "/login"} icon={<User className="w-5 h-5" />} label={user ? "Profile" : "Login"} isActive={isActive(user ? '/profile' : '/login')} />
        </div>
      </div>

      {/* Add padding for mobile navigation */}
      <div className="md:hidden h-16"></div>
    </div>
  );
};

const NavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
        : 'text-gray-600 hover:text-gray-800 hover:bg-white/60 backdrop-blur-sm'
    }`}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);

const MobileNavLink: React.FC<{
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all duration-200 ${
      isActive
        ? 'text-orange-600'
        : 'text-gray-500 hover:text-gray-700'
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </Link>
);

export default Layout;