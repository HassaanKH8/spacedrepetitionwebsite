import React, { useEffect, useState } from 'react';
import '../App.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MainScreen = () => {

    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [subject, setSubject] = useState("")
    const [task, setTask] = useState("")

    const [message, setMessage] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("user_token")
        if (token) {
            const decoded = jwtDecode(token)
            setUsername(decoded.username)
        } else {
            navigate('/login')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${process.env.REACT_APP_LINK}/api/task`, { subject: subject, task: task, username: username });
            if (response.data.message === "Task Submitted!") {
                setMessage('Keep it up!')
                setTimeout(()=>{
                    setMessage('')
                },3000)
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
        setSubject('')
        setTask('')
    }

    return (
        <div className="page">
            <div className='navbar'>
                <h1 className='heading'>Spaced Repetition App</h1>
            </div>
            <div className='bottomsection'>
                <h1 className='heading2'>For Long-Term Retention</h1>
                <h1 className='heading3'>{username}</h1>
                <form onSubmit={handleSubmit}>
                    <div className='entrydiv'>
                        <p className='entryp'>Subject:</p>
                        <input className='entryinput' type='text' placeholder='Enter Subject...' value={subject} onChange={(e) => { setSubject(e.target.value) }} />
                    </div>
                    <div className='entrydiv'>
                        <p className='entryp'>Task:</p>
                        <input className='entryinput' type='text' placeholder='Enter Task...' value={task} onChange={(e) => { setTask(e.target.value) }} />
                    </div>
                    <p className='entryp2' style={{ color: message ? "#36454f" : "#efeee9" }}>{message?(message):("Enter a Task")}</p>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <button className='submitbtn' type='submit'>Submit</button>
                    </div>
                </form>
                <button className='submitbtn' onClick={() => { navigate('/tasks') }}>My Tasks</button>
                <button className='submitbtn' onClick={() => { localStorage.removeItem('user_token'); navigate('/login') }}>Logout</button>
            </div>
        </div>
    );
}

export default MainScreen;
