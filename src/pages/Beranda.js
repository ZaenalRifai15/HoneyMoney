import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode
import "../styles/Beranda.css";

function Beranda() {
  const [user, setUser] = useState("User");
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(""); // State untuk jumlah pemasukan
  const [incomeDesc, setIncomeDesc] = useState(""); // State untuk deskripsi pemasukan
  const [expense, setExpense] = useState(""); // State untuk jumlah pengeluaran
  const [expenseDesc, setExpenseDesc] = useState(""); // State untuk deskripsi pengeluaran

  // Fetch data user dan transaksi
  useEffect(() => {
    const fetchUserAndTransactions = async () => {
      try {
        const token = localStorage.getItem("access"); // Ambil token dari localStorage
        if (!token) {
          console.error("Token tidak ditemukan. User belum login.");
          return;
        }

        // Dekode token untuk mendapatkan nama user
        const decodedToken = jwtDecode(token);
        setUser(decodedToken.username); // Ambil username dari token

        // Fetch transaksi
        const response = await fetch("http://localhost:8000/transactions/", {
          headers: {
            Authorization: `Bearer ${token}`, // Kirim token untuk autentikasi
          },
          body: JSON.stringify({
                description: incomeDesc,
                amount: parseFloat(income),
                transaction_type: "income",
            }),
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data); // Simpan transaksi ke state
        } else {
          console.error("Gagal mengambil data transaksi");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserAndTransactions();
  }, []);

  // Fungsi untuk menambahkan pemasukan
  const handleAddIncome = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access");
    try {
      const response = await fetch("http://localhost:8000/transactions/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          description: incomeDesc,
          amount: parseFloat(income),
          transaction_type: "income",
        }),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        setTransactions([...transactions, newTransaction]); // Tambahkan transaksi baru ke state
        setIncome("");
        setIncomeDesc("");
      } else {
        const err = await response.json();
        alert(err.detail || "Gagal menambah pemasukan");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Fungsi untuk menambahkan pengeluaran
  const handleAddExpense = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("access");
  let response; // Dideklarasikan di luar try agar bisa diakses di catch

  try {
    response = await fetch("http://localhost:8000/transactions/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        description: expenseDesc,
        amount: parseFloat(expense),
        transaction_type: "expense",
      }),
    });

    if (response.ok) {
      const newTransaction = await response.json();
      setTransactions([...transactions, newTransaction]);
      setExpense("");
      setExpenseDesc("");
    } else {
      console.error("Gagal menambahkan pengeluaran");
    }
  } catch (error) {
    // Tangani error jika response tidak berhasil atau gagal total
    if (response && (response.status === 401 || response.status === 403)) {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      window.location.href = "/login";
    } else {
      console.error("Error:", error);
    }
  }
};

  return (
    <div className="beranda-container">
      <header>
        <h1>Hallo, {user}</h1>
        <p>Selamat datang di HoneyMoney</p>
      </header>

      <section className="financial-summary">
        <h2>Catatan Keuangan</h2>
        <div className="transactions">
          {transactions.map((transaction) => (
            <div key={transaction.id} className={`transaction ${transaction.transaction_type}`}>
              <p>{transaction.description}</p>
              <p>{transaction.date}</p>
              <p>Rp {transaction.amount.toLocaleString("id-ID")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="add-transaction">
        <div className="form">
          <h3>Catat Pemasukan</h3>
          <form onSubmit={handleAddIncome}>
            <input
              type="number"
              placeholder="Jumlah Rp."
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Keterangan"
              value={incomeDesc}
              onChange={(e) => setIncomeDesc(e.target.value)}
              required
            />
            <button type="submit">Tambah Pemasukan</button>
          </form>
        </div>

        <div className="form">
          <h3>Catat Pengeluaran</h3>
          <form onSubmit={handleAddExpense}>
            <input
              type="number"
              placeholder="Jumlah Rp."
              value={expense}
              onChange={(e) => setExpense(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Keterangan"
              value={expenseDesc}
              onChange={(e) => setExpenseDesc(e.target.value)}
              required
            />
            <button type="submit">Tambah Pengeluaran</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Beranda;