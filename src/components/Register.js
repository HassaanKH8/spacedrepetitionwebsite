import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {

    const navigate = useNavigate()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [message, setMessage] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (username !== "" && email !== "" && password !== "") {
            if (password.length > 6) {
                try {
                    const response = await axios.post('http://localhost:5000/api/register', { username: username, email: email, password: password });
                    
                    if (response.data.message === "User already exists") {
                        setMessage("User already exists!")
                        setTimeout(() => {
                            setMessage('')
                        }, 2000)
                    }
                    if (response.data.message === "User registered successfully!") {
                        setMessage("User registered successfully!")
                        setTimeout(() => {
                            setMessage('')
                            navigate('/login')
                        }, 2000)
                    }
                    
                } catch (error) {
                    console.error('There was an error!', error);
                    setMessage("User already exists!")
                    setTimeout(() => {
                        setMessage('')
                    }, 2000)
                }
            }
            else {
                setMessage("Password length should be greater than 6.")
                setTimeout(() => {
                    setMessage('')
                }, 2000)
            }
        }
        else {
            setMessage("Please fill in all the required fields!")
            setTimeout(() => {
                setMessage('')
            }, 2000)
        }
    }

    return (
        <div className="page">
            <div className='navbar'>
                <h1 className='heading'>Spaced Repetition App</h1>
            </div>
            <div className='bottomsection'>
                <h1 className='heading2'>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className='entrydiv'>
                        <p className='entryp'>Username:</p>
                        <input className='entryinput' type='text' placeholder='Username...' value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className='entrydiv'>
                        <p className='entryp'>Email:</p>
                        <input className='entryinput' type='text' placeholder='Email...' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='entrydiv'>
                        <p className='entryp'>Password:</p>
                        <input className='entryinput' type='password' placeholder='Password...' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <p style={{ fontFamily: "EB Garamond", cursor: 'pointer' }} onClick={() => { navigate("/login") }}>{message}</p>

                        <button className='submitbtn' type='submit'>Register</button>
                    </div>
                </form>
                <p style={{ fontFamily: "EB Garamond", marginTop: 10, cursor: 'pointer' }} onClick={() => { navigate("/login") }}>Already have an account? Login</p>
            </div>
        </div>
    );
}

export default Register;
