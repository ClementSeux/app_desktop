// app .tsx vite react
import React from '@vitejs/plugin-react';
import Home from './Pages/Home';
import { SocketProvider } from './Hooks/useSocketProvider';
import { Routes } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';





export default function App() {
    return (
        <SocketProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                </Routes>      
            </Router>
        </SocketProvider>
        
    );
}