import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

const Clock = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/time');
                const formattedTime = format(new Date(response.data.time), "MMMM dd, yyyy HH:mm:ss");
                setTime(formattedTime);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const interval = setInterval(fetchData, 3000); 

        return () => clearInterval(interval); 
    }, []);

    return (
        <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>NTP Clock</h1>
            <p style={{ fontSize: '3rem', fontWeight: 'bold' }}>{time}</p>
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: 'green' }}>Client and server synchronized</p>
        </div>
    );
};

export default Clock;
