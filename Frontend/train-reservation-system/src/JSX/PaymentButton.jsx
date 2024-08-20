import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from './axios';

const PaymentButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { userDetails, seatId, trainId, fromStationName, toStationName, bookingDate } = location.state || {};
    const price = localStorage.getItem('price');
    const numberOfSeats = localStorage.getItem('numberOfSeats');

    const handlePayment = () => {
        const options = {
            key: "rzp_test_KfkSVTMrjRudas", // Replace with your Razorpay key ID
            amount: numberOfSeats*price * 100, // Amount in paise (50000 paise = 500 INR)
            currency: 'INR',
            name: 'MahaTrain',
            description: 'Test Transaction',
            handler: async function (response) {
                const bookingData = {
                    seatIds: seatId,
                    trainId,
                    fromStationName,
                    toStationName,
                    bookingDate,
                    userId: userDetails.userId,
                    paymentId: response.razorpay_payment_id,
                };

                try {
                    const result = await instance.post('/bookings', bookingData);
                    console.log('Booking successful:', result.data);

                    navigate('/payment-confirmation', {
                        state: {
                            paymentId: response.razorpay_payment_id,
                            amount: options.amount,
                            userDetails,
                            selectedTrain: bookingData.trainId,
                            seatId: bookingData.seatIds,
                            bookingDate: bookingData.bookingDate,
                        }
                    });
                } catch (error) {
                    console.error('Error creating booking:', error.response?.data || error.message);
                }
            },
            prefill: {
                name: localStorage.getItem('firstName'),
                email: localStorage.getItem('email'),
                contact: '9623910427'
            },
            notes: {
                address: 'Razorpay Corporate Office'
            },
            theme: {
                color: '#3399cc'
            }
        };

        if (typeof window.Razorpay === 'function') {
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } else {
            console.error('Razorpay SDK not available');
        }
    };

    return (
        <button onClick={handlePayment}>
            Pay with Razorpay
        </button>
    );
};

export default PaymentButton;
