import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Users, LogOut } from 'lucide-react';

function Layout() {
  const { signOut } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8" />
              <span className="ml-2 text-xl font-bold">KhataBook</span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => signOut()}
                className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-[calc(100vh-4rem)] shadow-sm">
          <nav className="mt-5 px-2">
            <Link
              to="/"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="mr-3 h-6 w-6" />
              Dashboard
            </Link>
            <Link
              to="/customers"
              className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                isActive('/customers') ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="mr-3 h-6 w-6" />
              Customers
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;