import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await axios.post(`${process.env.REACT_APP_LINK}/api/login`, {email, password});
            console.log(response.data);
            if (response.data.token) {
                localStorage.setItem('user_token', response.data.token)
                navigate('/')
            }
        } catch (error) {
            console.error('There was an error!', error);
        }

    }

    return (
        <div className="page">
            <div className='navbar'>
                <h1 className='heading'>Spaced Repetition App</h1>
            </div>
            <div className='bottomsection'>
                <h1 className='heading2'>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className='entrydiv'>
                        <p className='entryp'>Email:</p>
                        <input className='entryinput' type='text' placeholder='Email...' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className='entrydiv'>
                        <p className='entryp'>Password:</p>
                        <input className='entryinput' type='password' placeholder='Password...' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
                        <button className='submitbtn' type='submit'>Login</button>
                    </div>
                </form>
                <p style={{fontFamily: "EB Garamond", marginTop: 10, cursor: 'pointer'}} onClick={()=>{navigate("/register")}}>Don't have an account? Register</p>
                <div style={{ display: 'flex', flexDirection: 'column', marginTop: 20, fontFamily: "EB Garamond", fontSize: 20}}>
                    <p>Email:</p>
                    <p>demo123@gmail.com</p>
                    <div style={{marginTop: 10}}></div>
                    <p>Password:</p>
                    <p>demo123</p>
                </div>
            </div>
        </div>
    );
}

export default Login;
