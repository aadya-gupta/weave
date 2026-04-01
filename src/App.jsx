import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Footer />
    </div>
  );
}