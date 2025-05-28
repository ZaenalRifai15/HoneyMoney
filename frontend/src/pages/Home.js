import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Selamat Datang di HoneyMoney</h1>
      <Link to="/register">
        <button className="home-button">Daftar</button>
      </Link>
      <Link to="/login">
        <button className="home-button">Login</button>
      </Link>
    </div>
  );
}

export default Home;