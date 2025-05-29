import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">
        <img src="assets/HoneyMoney.png" alt="Logo" className="login-logo" />
        <h2>Login</h2>
        <input type="text" placeholder="Nama" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <button className="login-button">Masuk</button>
        <div className="divider">
          <span>Atau</span>
        </div>
        <button className="google-login-button">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
          Masuk Dengan Google
        </button>
        <p className="signup-text">
          Belum Punya Akun? <a href="/register">Daftar</a>
        </p>
      </div>
      <div className="login-illustration">
        <img src="assets/FormCharacter.png" alt="Illustration" />
      </div>
    </div>
  );
}

export default Login;