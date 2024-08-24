import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './AddTransaction.module.css';

const AddTransaction = () => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('Expense');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [error, setError] = useState('');
  const userId = localStorage.getItem('userId');

  const navigate = useNavigate();

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
        console.log(result.message);
        window.location.reload();
      } else {
        console.log(result.message);
        setError(result.error);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.AddTransactionContainer}>
      <h2>Add New Transaction</h2>
      <form onSubmit={handleAddTransaction}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Transaction Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className={styles.formGroup}>
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

        <div className={styles.formGroup}>
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

        <button type="submit" className={styles.submitButton}>
          Add Transaction
        </button>
        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>

  )
}


export default AddTransaction