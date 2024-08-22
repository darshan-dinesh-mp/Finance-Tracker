import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const   Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
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
            // setError('Failed to fetch transactions');
        }
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            navigate('/login'); // Redirect to login if userId is not available
        } else {
            fetchTransactions(); // Fetch transactions on component mount
        }
    }, [userId, navigate, fetchTransactions]);

    return (
        <div className={styles['dashboard-container']}>
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
        </div>
    );
};

export default Dashboard;
