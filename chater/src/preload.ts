// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

contextBridge.exposeInMainWorld("MessageAPI", {
    addMessageListener(callback: (msg: unknown, sender: string) => void) {
        const wrappedCallback = (
            _: IpcRendererEvent,
            msg: unknown,
            sender: string
        ) => {
            console.log("Received message from main:", msg);
            callback(msg, sender);
        };
        ipcRenderer.on("socket-message", wrappedCallback);
        return () => ipcRenderer.off("socket-message", wrappedCallback);
    },
    send(msg: unknown) {
        console.log("Sending message from preload:", msg);
        ipcRenderer.send("socket-message", msg);
    },
});
