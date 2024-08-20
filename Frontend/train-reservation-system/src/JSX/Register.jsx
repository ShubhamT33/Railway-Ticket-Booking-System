import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/register.css';

const Register = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/auth/register', { firstName, lastName, email, password });
            if (response.status === 200) {
                toast.success('User registered successfully');
                navigate('/');
            } else {
                toast.error('Registration failed');
            }
        } catch (error) {
            toast.error(`Error registering: ${error.message}`);
        }
    };

    return (
        <div>
            <div className="background-image"></div>
            <div className="register-form">
                <form className="form" onSubmit={handleRegister}>
                    <p className="title">Register</p>
                    <p className="message">Signup now and get full access to our app.</p>
                    <div className="flex">
                        <label>
                            <input
                                required
                                placeholder=""
                                type="text"
                                className="input"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <span>FirstName</span>
                        </label>
                        <label>
                            <input
                                required
                                placeholder=""
                                type="text"
                                className="input"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            <span>LastName</span>
                        </label>
                    </div>
                    <label>
                        <input
                            required
                            placeholder=""
                            type="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <span>Email</span>
                    </label>
                    <label>
                        <input
                            required
                            placeholder=""
                            type="password"
                            className="input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span>Password</span>
                    </label>
                    <label>
                        <input
                            required
                            placeholder=""
                            type="password"
                            className="input"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span>Confirm password</span>
                    </label>
                    <button className="submit" type="submit">Submit</button>
                    <p className="signin">Already have an account? <a href="/login">Login</a></p>
                </form>
                <ToastContainer />
            </div>
        </div>
    )
}

export default Register;
