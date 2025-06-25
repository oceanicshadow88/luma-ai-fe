import { useState } from 'react';
import { ChevronDown, User, LogOut } from 'lucide-react';
import logo from '@assets/logo.svg';

const NavigationBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleViewProfile = () => {
    console.log('View Profile clicked');
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-">
        {/* Logo Section */}
        <div className="flex items-center">
          <img src={logo} alt="Luma AI Logo" className="h-6 sm:h-8" />
        </div>

        {/* User Profile Section */}
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Admin User</span>
            <ChevronDown 
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`} 
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button
                onClick={handleViewProfile}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <User className="w-4 h-4 mr-3" />
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </nav>
  );
};

export default NavigationBar;