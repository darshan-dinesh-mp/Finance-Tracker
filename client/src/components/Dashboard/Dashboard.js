import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [filter, setFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('DateDesc');
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');

    const fetchTransactions = useCallback(async () => {
        if (!userId) return;

        try {
            const response = await fetch(`http://localhost:5000/api/transaction/${userId}`);
            const data = await response.json();
            console.log('Fetched transactions:', data);

            let filteredData = data;
            if (filter !== 'All') {
                filteredData = data.filter(transaction => transaction.transactionType === filter);
            }

            if (sortOrder === 'DateAsc') {
                filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if (sortOrder === 'DateDesc') {
                filteredData.sort((a, b) => new Date(b.date) - new Date(a.date));
            }

            setTransactions(filteredData);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }, [userId, filter, sortOrder]);

    useEffect(() => {
        if (!userId) {
            navigate('/login');
        } else {
            fetchTransactions();
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

            {/* Filter and Sort Controls */}
            <div className={styles['controls']}>
                <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className={styles['filter-select']}
                >
                    <option value="All">All</option>
                    <option value="Income">Income</option>
                    <option value="Expense">Expense</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={styles['sort-select']}
                >
                    <option value="DateAsc">Date Ascending</option>
                    <option value="DateDesc">Date Descending</option>
                </select>
            </div>

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
                            {transaction.transactionType === 'Income' ? '↑' : '↓'} ₹{transaction.amount}
                        </span>
                    </div>
                ))}
            </div>

            {selectedTransaction && (
                <div className={styles['transaction-popup']}>
                    <div className={styles['popup-content']}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 384 512"
                            width="24px"
                            onClick={closePopup}
                            className={styles['closeButton']}
                        >
                            <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                        </svg>
                        <h4>{selectedTransaction.name}</h4>
                        <p>
                            <strong>Amount: </strong>
                            <span
                                className={
                                    selectedTransaction.transactionType === 'Income'
                                        ? styles['income-amount']
                                        : styles['expense-amount']
                                }
                            >
                                ₹{selectedTransaction.amount}
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
