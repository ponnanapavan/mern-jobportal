import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [newJobs, setNewJobs] = useState([]);
    const [count,setCount]=useState(0);

    const userData = JSON.parse(localStorage.getItem('userData')) || null;

    useEffect(() => {
        if (!userData?.userid) {
            
            return; 
        }
  
        // Initialize the socket connection
        const socket = io("http://localhost:5000");

    
        socket.on('connect', () => {
            socket.emit('userId', userData.userid);
        });

       
        socket.on('disconnect', () => {
            console.log("Disconnected from the socket server");
        });

       
        socket.on('jobRecommendations', (data) => {
            setNewJobs(data);
            setCount(data.length)
            console.log(data)
        });

       
        return () => {
            socket.disconnect();
           
        };
    }, [userData]); 

    return (
        <SocketContext.Provider value={{ newJobs,count }}>
            {children}
        </SocketContext.Provider>
    );
};
