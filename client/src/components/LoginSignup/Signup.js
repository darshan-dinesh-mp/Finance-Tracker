import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Signup.module.css';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const result = await response.json();
            if (response.ok) {
                setSuccess(result.message);
                setName('');
                setEmail('');
                setPassword('');
                navigate('/login');
            } else {
                setError(result.error);
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.thumbnail}>
                <h1>Finance Tracker</h1>
            </div>
            <div className={styles.signupContainer}>
                <h2 className={styles.signupTitle}>Signup</h2>
                <form className={styles.signupForm} onSubmit={handleSignup}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className={styles.signupButton} type="submit">Sign Up</button>
                    {error && <p className={styles.error}>{error}</p>}
                    {success && <p className={styles.success}>{success}</p>}
                </form>
                <p>
                    Already have an account? <Link to="/login">Login here</Link>
                </p>
            </div>
        </div>


    );
};

export default Signup;
