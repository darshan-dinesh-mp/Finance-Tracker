import React, { useState } from 'react';
import styles from './Home.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Dashboard/Dashboard';
import AddTransaction from '../Transaction/AddTransaction';

const Home = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const handleLogout = () => {
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <div className={styles.homeContainer}>
            <div className={styles.sidebar}>

                <h2>Finance Tracker</h2>
                <span
                    className={`${styles.tab} ${activeTab === 'dashboard' ? styles.active : ''}`}
                    onClick={() => handleTabChange('dashboard')}
                >
                    Dashboard
                </span>
                <span
                    className={`${styles.tab} ${activeTab === 'addTransaction' ? styles.active : ''}`}
                    onClick={() => handleTabChange('addTransaction')}
                >
                    Add Transaction
                </span>
                <span
                    className={styles.logout}
                    onClick={handleLogout}
                >
                    Logout
                </span>
            </div>
            <div className={styles.content}>
                {activeTab === 'dashboard' && <Dashboard />}
                {activeTab === 'addTransaction' && <AddTransaction />}
            </div>
        </div>
    );
};

export default Home;
