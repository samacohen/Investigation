// src/pages/LandingPage.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import backgroundImage from '../assets/background.png'; // Import your background image

const LandingPage = () => {
  return (
    <div
      className="relative flex flex-col min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Background blur overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-20 backdrop-blur-lg"></div>

      {/* Page content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Triage Bot for Emergency Care</h1>
          <p className="text-xl text-gray-600">A fast and efficient chatbot for emergency triage assistance.</p>
          <Link to="/dashboard">
            <button className="mt-8 px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600">
              Get Started
            </button>
          </Link>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
