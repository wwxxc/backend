'use client'
import { useState, useEffect } from 'react';

const Countdown = ({ targetTimestamp }: { targetTimestamp: number }) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null);

    useEffect(() => {
        const updateCountdown = () => {
        const now = Math.floor(Date.now() / 1000);
        setTimeLeft(targetTimestamp - now);
    };

    updateCountdown(); 
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
    }, [targetTimestamp]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${String(hours).padStart(2, '0')} hours, ${String(minutes).padStart(2, '0')} minutes, ${String(secs).padStart(2, '0')} seconds left`;
    };

    if (timeLeft === null) {
        return <div>Loading...</div>;
    }
    return (
        <div>
        <p>{formatTime(timeLeft)}</p>
        </div>
    );
    };

export default Countdown;
