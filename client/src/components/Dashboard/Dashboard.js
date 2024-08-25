import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [filter, setFilter] = useState('All');
    const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
    const [sortOrder, setSortOrder] = useState('DateDesc');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
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
                filteredData = filteredData.filter(transaction => transaction.transactionType === filter);
            }

            if (paymentMethodFilter !== 'All') {
                filteredData = filteredData.filter(transaction => transaction.paymentMethod === paymentMethodFilter);
            }

            if (startDate && endDate) {
                filteredData = filteredData.filter(transaction => {
                    const transactionDate = new Date(transaction.date);
                    return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
                });
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
    }, [userId, filter, paymentMethodFilter, sortOrder, startDate, endDate]);

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
            <h3>{transactions.length} Transactions</h3>

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
                    value={paymentMethodFilter}
                    onChange={(e) => setPaymentMethodFilter(e.target.value)}
                    className={styles['filter-select']}
                >
                    <option value="All">All Payment Methods</option>
                    <option value="UPI">UPI</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Net Banking">Net Banking</option>
                </select>

                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className={styles['sort-select']}
                >
                    <option value="DateAsc">Date Ascending</option>
                    <option value="DateDesc">Date Descending</option>
                </select>

                <div className={styles['date-filters']}>
                    <label htmlFor="startDate">From:</label>
                    <input
                        type="date"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={styles['date-input']}
                    />
                </div>
                <div className={styles['date-filters']}>
                    <label htmlFor="endDate">Till:</label>
                    <input
                        type="date"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={styles['date-input']}
                    />
                </div>
            </div>

            <div className={styles['transaction-list']}>
                {transactions.map((transaction) => (
                    <div className={styles['transaction-item']}>
                        <div
                            key={transaction.id}
                            // className={styles['transaction-item']}
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
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="15px">
                                <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z" />
                            </svg>
                        </span>
                    </div>
                ))}
            </div>

            {selectedTransaction && (
                <div className={styles['transaction-popup']}>
                    <div className={styles['popupContent']}>
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
