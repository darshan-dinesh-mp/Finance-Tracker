import React, { useState } from 'react';
import styles from './Home.module.css'; // Import the CSS module
import { useNavigate } from 'react-router-dom';

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
                <a
                    className={`${styles.tab} ${activeTab === 'dashboard' ? styles.active : ''}`}
                    onClick={() => handleTabChange('dashboard')}
                >
                    Dashboard
                </a>
                <a
                    className={styles.logout}
                    onClick={handleLogout}
                >
                    Logout
                </a>
            </div>
            <div className={styles.content}>
                {activeTab === 'dashboard' && <div>Dashboard Content</div>}
            </div>
        </div>
    );
};

export default Home;
