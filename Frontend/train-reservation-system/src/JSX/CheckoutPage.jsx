import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
    const [bookingDetails, setBookingDetails] = useState(null);

    useEffect(() => {
        const firstName = localStorage.getItem('firstName');

        axios.get(`http://localhost:8080/bookings/mybooking?userfirstname=${firstName}`)
            .then(response => {
                setBookingDetails(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the booking details!", error);
            });
    }, []);

    return (
        <div className="checkout-page">
            <style>
                {`
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }

                body {
                  font-family: Georgia, 'Times New Roman', Times, serif;
                  background: url('BgImage.jpg') no-repeat center center fixed;
                  background-size: cover;
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  color: #333;
                  position: relative;
                  overflow: hidden;
                }

                .overlay {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  background: rgba(0, 0, 0, 0.6); 
                  z-index: 1;
                }

                .checkout-container {
                  position: relative;
                  z-index: 2;
                  background: rgba(255, 255, 255, 0.15);
                  width: 500px; 
                  padding: 40px;
                  border-radius: 20px;
                  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                  backdrop-filter: blur(10px);
                  border: 1px solid rgba(255, 255, 255, 0.18);
                  text-align: center;
                  transition: transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out;
                }

                .checkout-container:hover {
                  transform: translateY(-20px);
                  box-shadow: 0 12px 40px rgba(31, 38, 135, 0.47);
                }

                .checkout-container h2 {
                  color: #ffffff;
                  margin-bottom: 30px;
                  font-size: 32px;
                  font-weight: 600;
                }

                .booking-details {
                  margin-bottom: 40px;
                  padding: 20px;
                  background-color: rgba(255, 255, 255, 0.2);
                  border-radius: 15px;
                  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.05);
                  color: #ffffff;
                }

                .booking-details h3 {
                  color: #ffffff;
                  margin-bottom: 20px;
                  font-size: 24px;
                  font-weight: 500;
                }

                .booking-details p {
                  font-size: 18px;
                  margin: 10px 0;
                  line-height: 1.6;
                }

                .payment-button {
                  width: 100%;
                  background: linear-gradient(135deg, #6e8efb, #a777e3);
                  color: white;
                  font-size: 20px;
                  padding: 15px 0;
                  border: none;
                  border-radius: 50px;
                  cursor: pointer;
                  transition: background 0.4s ease, transform 0.4s ease;
                  font-weight: 600;
                  letter-spacing: 1px;
                }

                .payment-button:hover {
                  background: linear-gradient(135deg, #5b79e1, #9257c3);
                  transform: translateY(-5px);
                }

                .payment-button:focus {
                  outline: none;
                  box-shadow: 0 0 15px rgba(110, 142, 251, 0.5);
                }
                `}
            </style>
            <div className="overlay"></div>
            <div className="checkout-container">
                <h2>My Bookings</h2>
                {bookingDetails ? (
                    <div className="booking-details">
                        <h3>User Details</h3>
                        <p>Name: {bookingDetails.userName}</p>

                        <h3>Booking Details</h3>
                        <p>Train: {bookingDetails.trainName}</p>
                        <p>Seat(s): {bookingDetails.seatIds?.join(', ')}</p>
                        <p>Date: {bookingDetails.bookingDate}</p>
                        <p>Price: Inr {bookingDetails.price}</p>
                        <p>Payment ID: {bookingDetails.paymentId}</p>

                        <button className="btn btn-danger">
                            Cancle
                        </button>
                    </div>
                ) : (
                    <p>Loading booking details...</p>
                )}
            </div>
        </div>
    );
}

export default CheckoutPage;
