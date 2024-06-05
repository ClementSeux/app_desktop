import React, {
    createContext,
    useContext,
    useMemo,
    ReactNode
} from "react";

export type AppSocket  = {
    onMessage(callback: (
        msg: unknown, 
        sender: string, 
        convoId: number
    ) => void):  void;
    send(msg: unknown, sender: string, convoId: number): void;
    
};

declare global {
    interface Window {
        MessageAPI: {
            addMessageListener: (
                callback: (
                    msg: unknown, 
                    sender: string, 
                    convoId: number
                ) => void) => void;
            send(msg: unknown, sender: string, convoId: number): void;

        }
    }
}

const socketContext = createContext<AppSocket | null>(null);

export function SocketProvider({ children }: { children: ReactNode }) {
   const appSocket = useMemo<AppSocket>(() => ({

onMessage(callback) {
    console.log("Adding message listener socket provider");
    return window.MessageAPI.addMessageListener(callback);
   },
send(msg, sender, convoId) {
    console.log("Sending message socket porvider:" ,    msg, sender, convoId);
    window.MessageAPI.send(msg, sender, convoId);
    }
}), []);

         
 
    return (
        <socketContext.Provider value={appSocket}>
            {children}
        </socketContext.Provider>
    );
}

export function useSocket() {
    const socket = useContext(socketContext);
    if (!socket) {
        throw new Error("useSocket must be used within a SocketProvider");
    }

    return socket;
}
