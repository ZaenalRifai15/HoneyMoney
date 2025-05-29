import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8000/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Registrasi berhasil:", data);
      setMessage("Registrasi berhasil!");
      navigate("/login");
    } else {
      const errorData = await response.json();
      console.error("Registrasi gagal:", errorData);
      setMessage(errorData.error || "Registrasi gagal!");
    }
  } catch (error) {
    console.error("Error:", error);
    setMessage("Gagal menghubungi server.");
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <img src="assets/HoneyMoney.png" alt="Logo" className="login-logo" />
        <h2>Register</h2>
        <input type="text" placeholder="Nama" className="login-input" />
        <input type="password" placeholder="Password" className="login-input" />
        <input type="password" placeholder="Confirm Password" className="login-input" />
        <button className="login-button">Masuk</button>
        <div className="divider">
          <span>Atau</span>
        </div>
        <button className="google-login-button">
          <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
          Daftar Dengan Google
        </button>
        <p className="signup-text">
          Sudah Punya Akun? <a href="/login">Masuk</a>
        </p>
      </div>
      <div className="login-illustration">
        <img src="assets/FormCharacter.png" alt="Illustration" />
      </div>
    </div>
  );
}

export default Register;