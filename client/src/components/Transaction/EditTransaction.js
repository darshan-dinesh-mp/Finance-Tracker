import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EditTransaction.module.css';

const EditTransaction = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { transaction } = location.state;

    const [transactionType, setTransactionType] = useState(transaction.transactionType);
    const [name, setName] = useState(transaction.name);
    const [amount, setAmount] = useState(transaction.amount);
    const [category, setCategory] = useState(transaction.category);
    const [date, setDate] = useState(transaction.date);
    const [description, setDescription] = useState(transaction.description);
    const [paymentMethod, setPaymentMethod] = useState(transaction.paymentMethod);
    const [error, setError] = useState('');

    const handleEditTransaction = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/transaction/edit`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: transaction.id,
                    transactionType,
                    name,
                    amount,
                    category,
                    date,
                    description,
                    paymentMethod,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                navigate('/home');
            } else {
                setError(result.error || 'Failed to update transaction');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    const handleCancel = () => {
        navigate('/home');
    };

    return (
        <div className={styles.EditTransactionContainer}>
            <h2>Edit Transaction</h2>
            <form onSubmit={handleEditTransaction}>

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
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select a category</option>
                        <optgroup label="Income">
                            <option value="Salary">Salary</option>
                            <option value="Freelance">Freelance</option>
                            <option value="Investments">Investments</option>
                            <option value="Gifts">Gifts</option>
                        </optgroup>
                        <optgroup label="Food & Drink">
                            <option value="Groceries">Groceries</option>
                            <option value="Restaurants">Restaurants</option>
                            <option value="Coffee">Coffee</option>
                            <option value="Fast Food">Fast Food</option>
                        </optgroup>
                        <optgroup label="Housing">
                            <option value="Rent">Rent</option>
                            <option value="Mortgage">Mortgage</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Repairs">Repairs</option>
                        </optgroup>
                        <optgroup label="Transportation">
                            <option value="Fuel">Fuel</option>
                            <option value="Public Transit">Public Transit</option>
                            <option value="Car Maintenance">Car Maintenance</option>
                            <option value="Tolls">Tolls</option>
                        </optgroup>
                        <optgroup label="Health & Fitness">
                            <option value="Medical">Medical</option>
                            <option value="Gym">Gym</option>
                            <option value="Health Insurance">Health Insurance</option>
                        </optgroup>
                        <optgroup label="Entertainment">
                            <option value="Movies">Movies</option>
                            <option value="Books">Books</option>
                            <option value="Concerts">Concerts</option>
                            <option value="Hobbies">Hobbies</option>
                        </optgroup>
                        <optgroup label="Clothing & Shopping">
                            <option value="Clothing">Clothing</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Home Goods">Home Goods</option>
                        </optgroup>
                        <optgroup label="Education">
                            <option value="Tuition">Tuition</option>
                            <option value="Books & Supplies">Books & Supplies</option>
                            <option value="Courses">Courses</option>
                        </optgroup>
                        <optgroup label="Travel">
                            <option value="Flights">Flights</option>
                            <option value="Accommodation">Accommodation</option>
                            <option value="Food & Drink (while traveling)">Food & Drink (while traveling)</option>
                            <option value="Activities & Tours">Activities & Tours</option>
                        </optgroup>
                        <optgroup label="Subscriptions & Donations">
                            <option value="Subscriptions">Subscriptions</option>
                            <option value="Donations">Donations</option>
                        </optgroup>
                        <optgroup label="Other">
                            <option value="Pets">Pets</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </optgroup>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
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
                    <label htmlFor="paymentMethod">Payment Method:</label>
                    <select
                        id="paymentMethod"
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                        <option value="UPI">UPI</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="Cash">Cash</option>
                    </select>
                </div>

                <button type="submit" className={styles.submitButton}>
                    Save
                </button>
                <button type="reset" className={styles.cancelButton} onClick={handleCancel}>
                    Cancel
                </button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
        </div>
    );
};

export default EditTransaction;
