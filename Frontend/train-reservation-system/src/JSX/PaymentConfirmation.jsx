import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentConfirmation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { paymentId, amount, userDetails, selectedTrain, seatId, bookingDate, bookingId } = location.state || {};

    if (!paymentId || !amount || !userDetails || !selectedTrain || !seatId || !bookingDate || !bookingId) {
        return <div>No payment information available.</div>;
    }

    const handleCancelBooking = async () => {
        try {
            await axios.delete(`http://localhost:8080/bookings/cancel/${bookingId}`);
            alert('Booking cancelled successfully.');
            navigate('/home');
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            alert('Failed to cancel booking.');
        }
    };

    return (
        <div className="payment-confirmation-container">
            <h2>Payment Confirmation</h2>
            <div className="payment-details">
                <h3>Payment Details</h3>
                <p>Payment ID: {paymentId}</p>
                <p>Amount Paid: ₹{amount / 100}</p>

                <h3>Booking Details</h3>
                <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
                <p>Email: {userDetails.email}</p>
                <p>Train: {selectedTrain}</p>
                <p>Seat(s): {seatId}</p>
                <p>Date: {bookingDate}</p>
            </div>
            <button onClick={() => navigate('/home')}>Return to Home</button>
            <button onClick={handleCancelBooking} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
                Cancel Booking
            </button>
        </div>
    );
};

export default PaymentConfirmation;
