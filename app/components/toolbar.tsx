import React, { useState } from 'react';
import { FaBold, FaItalic, FaUnderline, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify } from 'react-icons/fa';

const Toolbar = () => {
  const [activeButtons, setActiveButtons] = useState({});

  const buttons = [
    { icon: FaBold, label: 'Bold', shortcut: 'Ctrl+B' },
    { icon: FaItalic, label: 'Italic', shortcut: 'Ctrl+I' },
    { icon: FaUnderline, label: 'Underline', shortcut: 'Ctrl+U' },
    { icon: FaAlignLeft, label: 'Align Left', shortcut: 'Ctrl+L' },
    { icon: FaAlignCenter, label: 'Align Center', shortcut: 'Ctrl+E' },
    { icon: FaAlignRight, label: 'Align Right', shortcut: 'Ctrl+R' },
    { icon: FaAlignJustify, label: 'Justify', shortcut: 'Ctrl+J' },
  ];

  const handleClick = (label:any) => {
    setActiveButtons(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
    // Add your text editor action logic here
  };

  return (
    <div className="bg-gray-100 p-1 rounded-lg shadow-md">
      <div className="flex flex-wrap justify-center sm:justify-start items-center space-x-1 sm:space-x-2">
        {buttons.map(({ icon: Icon, label, shortcut }) => (
          <button
            key={label}
            onClick={() => handleClick(label)}
            className={`p-2 rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              activeButtons[label]
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
            aria-label={label}
            title={`${label} (${shortcut})`}
          >
            <Icon className="w-2 h-2 sm:w-3 sm:h-3" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;