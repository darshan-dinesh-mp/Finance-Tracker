import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from "./Dashboard.module.css"

const AddTransaction = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('Expense');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/transaction/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, name, amount, category, date, description, transactionType, paymentMethod }),
      });

      const result = await response.json();
      if (response.ok) {
        navigate('/home');
      } else {
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles['dashboard-container']}>
      <h2>Finance Dashboard</h2>
      <form onSubmit={handleAddTransaction}>
        <div>
          <label htmlFor="name">Transaction Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <br />
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="type">Transaction Type:</label>
          <select
            id="type"
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>
        <div>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="UPI">UPI</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
          </select>
        </div>
        <button type="submit">Add Transaction</button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  )
}


export default AddTransaction