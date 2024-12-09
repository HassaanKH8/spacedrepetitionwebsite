import React, { use, useEffect, useState } from 'react';
import '../App.css';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tasks = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [taskList, setTaskList] = useState([])

    const [edit, setEdit] = useState(false)
    const [editSubject, setEditSubject] = useState("")
    const [editTask, setEditTask] = useState("")
    const [theID, setTheID] = useState("")

    const [day1Down, setDay1Down] = useState(false)
    const [day2Down, setDay2Down] = useState(false)
    const [day3Down, setDay3Down] = useState(false)
    const [day4Down, setDay4Down] = useState(false)
    const [day5Down, setDay5Down] = useState(false)


    useEffect(() => {
        const token = localStorage.getItem("user_token")
        if (token) {
            const decoded = jwtDecode(token)
            setUsername(decoded.username)
            getTasks(decoded.username)
        } else {
            navigate('/login')
        }
    }, [])


    const handleEdit = (id, subject, task) => {
        setTheID(id)
        setEdit(true)
        setEditSubject(subject)
        setEditTask(task)
    }

    const handleSave = async () => {
        setLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/api/edittasks`, { id: theID, subject: editSubject, task: editTask });

            setEdit(false)
            getTasks(username)

        } catch (error) {
            console.error('There was an error!', error);
        }
        setLoading(false)
    }


    const getTasks = async (usern) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.REACT_APP_LINK}/tasks`, { username: usern });
            setTaskList(response.data.taskList);

        } catch (error) {
            console.error('There was an error!', error);
        }
        setLoading(false)
    }

    const handleDelete = async (id) => {
        setLoading(true)
        try {
            await axios.post(`${process.env.REACT_APP_LINK}/api/delete`, { id: id });

            getTasks(username)

        } catch (error) {
            console.error('There was an error!', error);
        }
        setLoading(false)
    }

    const day00 = new Date();
    const day01 = new Date(day00);
    day01.setDate(day00.getDate() - 1);
    const day03 = new Date(day00);
    day03.setDate(day00.getDate() - 3);
    const day06 = new Date(day00);
    day06.setDate(day00.getDate() - 6);
    const day10 = new Date(day00);
    day10.setDate(day00.getDate() - 10);



    const filterTasksByDate = (date) => {
        const targetDate = new Date(date);
        targetDate.setHours(0, 0, 0, 0);

        return taskList.filter(task => {
            const taskDate = new Date(task.date);
            taskDate.setHours(0, 0, 0, 0);
            return taskDate.getTime() === targetDate.getTime();
        });
    };

    const Day00Tasks = filterTasksByDate(day00);
    const Day01Tasks = filterTasksByDate(day01);
    const Day03Tasks = filterTasksByDate(day03);
    const Day06Tasks = filterTasksByDate(day06);
    const Day10Tasks = filterTasksByDate(day10);



    return (
        <div className="page">
            <div className='navbar'>
                <h1 className='heading'>Spaced Repetition App</h1>
            </div>
            <div className='bottomsection'>
                <h1 className='heading2'>Today's Tasks</h1>
                <h1 className='heading3'>{username}</h1>
                {loading && (
                    <p style={{ fontFamily: "EB Garamond" }}>Loading...</p>
                )}
                <div className='maintaskscontainer'>
                    <div className='thetaskcontainer'>
                        <h1 className='taskdata'>Day 00</h1>
                        {day1Down ? (
                            <img src={require('../assets/down.png')} className='taskpngs' onClick={() => { setDay1Down(false) }} />
                        ) : (
                            <img src={require('../assets/left.png')} className='taskpngs' onClick={() => { setDay1Down(true) }} />
                        )}
                    </div>
                    {day1Down && (
                        <div className='theothermaincontainer'>
                            {Day00Tasks.length > 0 ? (
                                <div style={{ width: "100%" }}>
                                    {Day00Tasks.map((task, index) => {
                                        return (
                                            <div key={index} className='theothertaskcontainer'>
                                                <h1 className='taskdata'>{task.subject} - {task.task}</h1>
                                                <div>
                                                    <img src={require('../assets/pencil.png')} className='taskpngs' onClick={() => { handleEdit(task._id, task.subject, task.task) }} />
                                                    <img src={require('../assets/bin.png')} className='taskpngs' onClick={() => { handleDelete(task._id) }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className='theothertaskcontainer'>
                                    <h1 className='taskdata'>No Task for This Day</h1>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='thetaskcontainer'>
                        <h1 className='taskdata'>Day 01</h1>
                        {day2Down ? (
                            <img src={require('../assets/down.png')} className='taskpngs' onClick={() => { setDay2Down(false) }} />

                        ) : (
                            <img src={require('../assets/left.png')} className='taskpngs' onClick={() => { setDay2Down(true) }} />
                        )}
                    </div>
                    {day2Down && (
                        <div className='theothermaincontainer'>
                            {Day01Tasks.length > 0 ? (
                                <div style={{ width: "100%" }}>
                                    {Day01Tasks.map((task, index) => {
                                        return (
                                            <div key={index} className='theothertaskcontainer'>
                                                <h1 className='taskdata'>{task.subject} - {task.task}</h1>
                                                <div>
                                                    <img src={require('../assets/pencil.png')} className='taskpngs' onClick={() => { handleEdit(task._id, task.subject, task.task) }} />
                                                    <img src={require('../assets/bin.png')} className='taskpngs' onClick={() => { handleDelete(task._id) }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className='theothertaskcontainer'>
                                    <h1 className='taskdata'>No Task for This Day</h1>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='thetaskcontainer'>
                        <h1 className='taskdata'>Day 03</h1>
                        {day3Down ? (
                            <img src={require('../assets/down.png')} className='taskpngs' onClick={() => { setDay3Down(false) }} />

                        ) : (
                            <img src={require('../assets/left.png')} className='taskpngs' onClick={() => { setDay3Down(true) }} />
                        )}
                    </div>
                    {day3Down && (
                        <div className='theothermaincontainer'>
                            {Day03Tasks.length > 0 ? (
                                <div style={{ width: "100%" }}>
                                    {Day03Tasks.map((task, index) => {
                                        return (
                                            <div key={index} className='theothertaskcontainer'>
                                                <h1 className='taskdata'>{task.subject} - {task.task}</h1>
                                                <div>
                                                    <img src={require('../assets/pencil.png')} className='taskpngs' onClick={() => { handleEdit(task._id, task.subject, task.task) }} />
                                                    <img src={require('../assets/bin.png')} className='taskpngs' onClick={() => { handleDelete(task._id) }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className='theothertaskcontainer'>
                                    <h1 className='taskdata'>No Task for This Day</h1>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='thetaskcontainer'>
                        <h1 className='taskdata'>Day 06</h1>
                        {day4Down ? (
                            <img src={require('../assets/down.png')} className='taskpngs' onClick={() => { setDay4Down(false) }} />

                        ) : (
                            <img src={require('../assets/left.png')} className='taskpngs' onClick={() => { setDay4Down(true) }} />
                        )}
                    </div>
                    {day4Down && (
                        <div className='theothermaincontainer'>
                            {Day06Tasks.length > 0 ? (
                                <div style={{ width: "100%" }}>
                                    {Day06Tasks.map((task, index) => {
                                        return (
                                            <div key={index} className='theothertaskcontainer'>
                                                <h1 className='taskdata'>{task.subject} - {task.task}</h1>
                                                <div>
                                                    <img src={require('../assets/pencil.png')} className='taskpngs' onClick={() => { handleEdit(task._id, task.subject, task.task) }} />
                                                    <img src={require('../assets/bin.png')} className='taskpngs' onClick={() => { handleDelete(task._id) }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className='theothertaskcontainer'>
                                    <h1 className='taskdata'>No Task for This Day</h1>
                                </div>
                            )}
                        </div>
                    )}
                    <div className='thetaskcontainer'>
                        <h1 className='taskdata'>Day 10</h1>
                        {day5Down ? (
                            <img src={require('../assets/down.png')} className='taskpngs' onClick={() => { setDay5Down(false) }} />

                        ) : (
                            <img src={require('../assets/left.png')} className='taskpngs' onClick={() => { setDay5Down(true) }} />
                        )}
                    </div>
                    {day5Down && (
                        <div className='theothermaincontainer'>
                            {Day10Tasks.length > 0 ? (
                                <div style={{ width: "100%" }}>
                                    {Day10Tasks.map((task, index) => {
                                        return (
                                            <div key={index} className='theothertaskcontainer'>
                                                <h1 className='taskdata'>{task.subject} - {task.task}</h1>
                                                <div>
                                                    <img src={require('../assets/pencil.png')} className='taskpngs' onClick={() => { handleEdit(task._id, task.subject, task.task) }} />
                                                    <img src={require('../assets/bin.png')} className='taskpngs' onClick={() => { handleDelete(task._id) }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className='theothertaskcontainer'>
                                    <h1 className='taskdata'>No Task for This Day</h1>
                                </div>
                            )}
                        </div>
                    )}
                    {edit && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <p className='entryp' style={{ marginTop: 10 }}>Subject:</p>
                            <input className='entryinput' type='text' placeholder='Enter Subject...' value={editSubject} onChange={(e) => { setEditSubject(e.target.value) }} />
                            <div style={{ marginTop: 10 }}></div>
                            <p className='entryp'>Task:</p>
                            <input className='entryinput' type='text' placeholder='Enter Task...' value={editTask} onChange={(e) => { setEditTask(e.target.value) }} />
                            <button className='submitbtn' onClick={handleSave}>Save</button>
                            <button style={{ marginBottom: 20 }} className='submitbtn' onClick={() => { setEdit(false) }}>Close</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Tasks;
