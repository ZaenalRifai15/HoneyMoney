import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="container">
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">
          <img src="/assets/HoneyMoney.png" alt="HoneyMoney Logo" />
          <span>HoneyMoney</span>
        </div>
        <nav className="nav-links">
          <a href="/register">Daftar</a>
          <a href="/login">Login</a>
        </nav>

        {/* Right Image */}
        <div className="hero-image">
          <div className="hero-circle"></div>
          <img src="/assets/LandingPage.png" alt="Finance Hero" className="hero-image" />
          <img src="/assets/Book.png" alt="Book Icon" className="icon icon-book" />
          <img src="/assets/Calculator.png" alt="Calculator Icon" className="icon icon-calculator" />
        </div>
      </header>

      <main className="content">
        {/* Left Text */}
        <div className="content-text">
          <h1>
            Kelola Keuangan Anda Lebih Mudah Bersama <span>HoneyMoney</span>
          </h1>
          <p>
            Kelola keuangan pribadi dengan mudah lewat HoneyMoney! Catat transaksi, atur anggaran, dan
            pelajari finansial semua cepat dan praktis dari perangkat Anda.
          </p>
        </div>
      </main>
    </div>
  );
}

export default Home;