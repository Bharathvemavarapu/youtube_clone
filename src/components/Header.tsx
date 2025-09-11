import React, { useState } from 'react';
import { Search, Menu, Mic, Upload, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick: () => void;
  onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800">
      <div className="flex items-center justify-between px-4 h-16">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center space-x-1">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <div className="w-5 h-3 bg-white rounded-sm"></div>
            </div>
            <span className="text-white text-xl font-semibold">YouTube</span>
          </div>
        </div>

        {/* Center section */}
        <div className="flex-1 max-w-2xl mx-8">
          <form onSubmit={handleSearch} className="flex">
            <div className="flex-1 flex">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-l-full text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-6 bg-zinc-700 border border-l-0 border-zinc-700 rounded-r-full hover:bg-zinc-600 transition-colors"
              >
                <Search className="w-5 h-5 text-zinc-300" />
              </button>
            </div>
            <button
              type="button"
              className="ml-4 p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 transition-colors"
            >
              <Mic className="w-5 h-5 text-white" />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <Upload className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors relative">
            <Bell className="w-5 h-5 text-white" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
          </button>
          <button className="p-2 hover:bg-zinc-800 rounded-full transition-colors">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;