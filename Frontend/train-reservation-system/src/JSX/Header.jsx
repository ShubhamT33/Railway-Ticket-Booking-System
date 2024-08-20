import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Header.css'; // Ensure this file exists for custom styling

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const updateUser = () => {
            const firstName = localStorage.getItem('firstName');
            const lastName = localStorage.getItem('lastName');

            if (firstName && lastName) {
                setUser({ firstName, lastName });
            } else {
                setUser(null);
            }
        };
        // Check for changes to the local storage when the component mounts
        updateUser();
      
    }, [localStorage.getItem('firstName')]);

    const handleLoginClick = () => {
        navigate('/');
    };

    const handleBookingClick = () => {
        navigate('/mybookings');
    };
    
    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('firstName');
        localStorage.removeItem('lastName');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        setUser(null);
        navigate('/');
    };

    return (
        <header className="header">
            <img src={`${process.env.PUBLIC_URL}/IRCTC_Logo.svg.png`} alt="IRCTC Logo" className="header-logo" />
            <div className="header-buttons">
                {user ? (
                    <>
                        <button className="btn btn-info">
                            {user.firstName} {user.lastName}
                        </button>

                        <button className="btn btn-info" onClick={handleBookingClick}>
                            MyBookings
                        </button>

                        <button className="btn btn-info" onClick={handleLogoutClick}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-info" onClick={handleLoginClick}>
                            Login
                        </button>
                     
                        <button className="btn btn-info" onClick={handleRegisterClick}>
                            Register
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;
