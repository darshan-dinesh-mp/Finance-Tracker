import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
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

    const handleTransactionClick = (transaction) => {
        setSelectedTransaction(transaction);
    };

    const closePopup = () => {
        setSelectedTransaction(null);
    };

    return (
        <div className={styles['dashboard-container']}>
            <h3>Transactions</h3>
            <div className={styles['transaction-list']}>
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className={styles['transaction-item']}
                        onClick={() => handleTransactionClick(transaction)}
                    >
                        <div>{transaction.name}</div>
                        <span
                            className={
                                transaction.transactionType === 'Income'
                                    ? styles['income-amount']
                                    : styles['expense-amount']
                            }
                        >
                            {transaction.transactionType === 'Income' ? '↑' : '↓'}₹{transaction.amount}
                        </span>
                    </div>
                ))}
            </div>

            {selectedTransaction && (
                <div className={styles['transaction-popup']}>
                    <div className={styles['popup-content']}>
                        <button className={styles['close-button']} onClick={closePopup}>
                            X
                        </button>
                        <h4>{selectedTransaction.name}</h4>
                        <p>
                            <strong>Amount:</strong> ₹
                            <span
                                className={
                                    selectedTransaction.transactionType === 'Income'
                                        ? styles['income-amount']
                                        : styles['expense-amount']
                                }
                            >
                                {selectedTransaction.amount}
                            </span>
                        </p>
                        <p><strong>Type:</strong> {selectedTransaction.transactionType}</p>
                        <p><strong>Category:</strong> {selectedTransaction.category || 'N/A'}</p>
                        <p><strong>Date:</strong> {selectedTransaction.date ? new Date(selectedTransaction.date).toLocaleDateString() : 'N/A'}</p>
                        <p><strong>Description:</strong> {selectedTransaction.description || 'N/A'}</p>
                        <p><strong>Method:</strong> {selectedTransaction.paymentMethod || 'N/A'}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
