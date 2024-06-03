// app .tsx vite react
import React from '@vitejs/plugin-react';
import Home from './Pages/Home';
import { SocketProvider } from './Hooks/useSocketProvider';



export default function App() {
    return (
        <div>
            <SocketProvider>
                <Home />
            </SocketProvider>
        </div>
    );
}