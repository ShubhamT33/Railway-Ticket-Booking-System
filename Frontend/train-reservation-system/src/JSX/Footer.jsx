import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/Footer.css'; // Ensure this file exists for custom styling

const Footer = () => {
    return (
        <footer className="footer">
            <nav className="footer-nav">
                <Link to="/" className="footer-link">About</Link>
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/" className="footer-link">Contact Us</Link>
                <Link to="/" className="footer-link">Welcome</Link>
            </nav>
        </footer>
    );
}

export default Footer;
