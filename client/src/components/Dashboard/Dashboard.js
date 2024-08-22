import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const [transactionType, setTransactionType] = useState('expense');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    const fetchTransactions = useCallback(async () => {
        if (!userId)
            return;

        try {
            const response = await fetch(`http://localhost:5000/api/transaction/${userId}`);
            const data = await response.json();
            console.log('Fetched transactions:', data);
            setTransactions(data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setError('Failed to fetch transactions');
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            navigate('/login'); // Redirect to login if userId is not available
        } else {
            fetchTransactions(); // Fetch transactions on component mount
        }
    }, [userId, navigate, fetchTransactions]);

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
                setSuccess(result.message);
                setName('');
                setAmount('');
                setCategory('');
                setDate('');
                setDescription('');
                setTransactionType('expense');
                fetchTransactions(); // Refresh transaction list
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
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
                {success && <p className={styles.success}>{success}</p>}
            </form>
            <h3>Transaction List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Method</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td>{transaction.name}</td>
                            <td>${transaction.amount}</td>
                            <td>{transaction.transactionType}</td>
                            <td>{transaction.category || 'N/A'}</td>
                            <td>{transaction.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}</td>
                            <td>{transaction.description || 'N/A'}</td>
                            <td>{transaction.paymentMethod || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className={styles['logout-button']} onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
