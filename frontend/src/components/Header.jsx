// src/components/Header.jsx

import React from 'react';

const Header = () => {
  return (
    <header className="bg-transparent border-b border-black py-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold text-black">Triage Bot</div>
        <ul className="flex space-x-6">
          <li><a href="/" className="text-black hover:underline">Home</a></li>
          <li><a href="/about" className="text-black hover:underline">About</a></li>
          <li><a href="/contact" className="text-black hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
