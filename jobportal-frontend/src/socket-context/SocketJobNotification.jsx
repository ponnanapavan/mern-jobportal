import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [newJobs, setNewJobs] = useState([]);
    const [count,setCount]=useState(0);

    // Safely retrieve userData from localStorage
    const userData = JSON.parse(localStorage.getItem('userData')) || null;

    useEffect(() => {
        if (!userData?.userid) {
            // console.error("User data not found or invalid");
            return; // Exit if no userData
        }
  
        // Initialize the socket connection
        const socket = io('https://mern-jobportal-2.onrender.com');

    
        socket.on('connect', () => {
            // console.log("Connected to the socket server");
            socket.emit('userId', userData.userid);
        });

       
        socket.on('disconnect', () => {
            console.log("Disconnected from the socket server");
        });

        // Listen for job recommendations
        socket.on('jobRecommendations', (data) => {
            setNewJobs(data);
            setCount(data.length)
            console.log(data)
        });

        // Clean up when the component unmounts or the socket disconnects
        return () => {
            socket.disconnect();
           
        };
    }, [userData]); // Adding userData as a dependency to ensure the socket setup occurs when userData changes

    return (
        <SocketContext.Provider value={{ newJobs,count }}>
            {children}
        </SocketContext.Provider>
    );
};
