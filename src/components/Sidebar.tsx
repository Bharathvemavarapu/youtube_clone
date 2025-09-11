import React from 'react';
import { Home, Compass, PlaySquare, Clock, ThumbsUp, Download, History, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: Compass, label: 'Explore' },
    { icon: PlaySquare, label: 'Subscriptions' },
  ];

  const libraryItems = [
    { icon: History, label: 'History' },
    { icon: PlaySquare, label: 'Your videos' },
    { icon: Clock, label: 'Watch later' },
    { icon: ThumbsUp, label: 'Liked videos' },
    { icon: Download, label: 'Downloads' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: HelpCircle, label: 'Help' },
  ];

  return (
    <aside className={`fixed top-16 left-0 h-full bg-zinc-900 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      <div className="p-3">
        {/* Main navigation */}
        <div className="space-y-1 mb-4">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-zinc-800 text-white' 
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="ml-6">{item.label}</span>}
            </button>
          ))}
        </div>

        {isOpen && <hr className="border-zinc-700 mb-4" />}

        {/* Library section */}
        {isOpen && (
          <div className="space-y-1 mb-4">
            <h3 className="text-zinc-400 text-sm font-medium px-3 mb-2">Library</h3>
            {libraryItems.map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="ml-6">{item.label}</span>
              </button>
            ))}
          </div>
        )}

        {isOpen && <hr className="border-zinc-700 mb-4" />}

        {/* Bottom section */}
        <div className="space-y-1">
          {bottomItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center px-3 py-2 rounded-lg text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isOpen && <span className="ml-6">{item.label}</span>}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;