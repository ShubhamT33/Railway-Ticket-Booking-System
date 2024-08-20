import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PaymentButton from './PaymentButton';
import instance from './axios';
// import '../CSS/Checkout.css';

const Checkout = () => {
    const location = useLocation();
    const { userDetails, seatId, trainId, fromStationName, toStationName, bookingDate } = location.state;
    const [price, setPrice] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const numberOfSeats = localStorage.getItem('numberOfSeats');
    useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await instance.get(`/bookings/price?fromStation=${fromStationName}&toStation=${toStationName}`);
                setPrice(response.data);
                localStorage.setItem('price', response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchPrice();
    }, [fromStationName, toStationName]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading price: {error.message}</p>;

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>
            <div className="checkout-details">
                <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
                <p>Email: {userDetails.email}</p>
                <p>Train ID: {trainId}</p>
                <p>Seat(s): {seatId.sort((a, b) => a - b).join(', ')}</p>
                <p>Date: {bookingDate}</p>
                <p>Price: {price*numberOfSeats}</p>
            </div>
            <PaymentButton
                userDetails={userDetails}
                seatId={seatId}
                trainId={trainId}
                fromStationName={fromStationName}
                toStationName={toStationName}
                bookingDate={bookingDate}
                price={price}
            />
        </div>
    );
};

export default Checkout;
