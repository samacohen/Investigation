// src/pages/LandingPage.jsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <main className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">Welcome to My Website</h1>
        <p className="text-xl text-gray-600">This is a simple landing page built with Tailwind CSS and React.</p>
        <button className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
          Get Started
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
