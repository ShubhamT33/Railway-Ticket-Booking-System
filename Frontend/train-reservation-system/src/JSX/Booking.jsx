

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../CSS/Booking.css';
import instance from './axios';

const Booking = () => {
    const location = useLocation();
    const { availableSeats = [], trainId, fromStationName, toStationName, bookingDate } = location.state || {};
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigate = useNavigate();

    const handleSeatClick = (seatId) => {
        setSelectedSeats((prevSelected) =>
            prevSelected.includes(seatId)
                ? prevSelected.filter((s) => s !== seatId)
                : [...prevSelected, seatId]
        );
    };

    const handleBookClick = async () => {
        try {
            

            const userDetails = {
                userId: localStorage.getItem('userId'),
                firstName: localStorage.getItem('firstName'),
                lastName: localStorage.getItem('lastName'),
                email: localStorage.getItem('email'),
                
            };

            const seatId = selectedSeats;
            localStorage.setItem('numberOfSeats', seatId.length);
            
            navigate('/checkout', { state: { userDetails, seatId, trainId, fromStationName, toStationName, bookingDate } });
        } catch (error) {
            console.error('Error fetching price:', error);
        }
    };

    return (
        <div className="booking-container">
            <div className="background-image"></div>
            <button className="back-button" onClick={() => navigate(-1)}>Back</button>
            <h1>Available Seats for Train {trainId}</h1>
            <div className="bus-container">
                <div className="seats-container">
                    {availableSeats.length > 0 ? (
                        availableSeats.map((seat) => (
                            <div
                                key={seat.id}
                                className={`seat-box ${selectedSeats.includes(seat.id) ? 'selected' : ''}`}
                                onClick={() => handleSeatClick(seat.id)}
                            >
                                {seat.seatNumber}
                            </div>
                        ))
                    ) : (
                        <p>No seats available.</p>
                    )}
                </div>
            </div>
            <button className="book-button" onClick={handleBookClick}>Book</button>
        </div>
    );
};

export default Booking;
