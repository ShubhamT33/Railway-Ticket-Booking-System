import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './JSX/HomePage';
import TrainList from './JSX/TrainList';
import Booking from './JSX/Booking';
import Header from './JSX//Header';
import Footer from './JSX/Footer';
import './App.css'; // Ensure this file exists for custom styling
import Login from './JSX/Login';
import Register from './JSX/Register';
import Checkout from './JSX/Checkout';
import PaymentConfirmation from './JSX/PaymentConfirmation';
import AdminDashboard from './JSX/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import CheckoutPage from './JSX/CheckoutPage';


const App = () => {
    return (
        
        <Router>
            <div className="app">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Login />} />
                        
                        <Route path="/booking/:trainId" element={<Booking />} />
                        <Route path="/trainlist" element={<TrainList />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/payment-confirmation" element={<PaymentConfirmation />} /> {/* Add this route */}
                        <Route path="/mybookings" element={<CheckoutPage />} />
                        <Route path="/admin" element={<ProtectedRoute element={AdminDashboard} />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
