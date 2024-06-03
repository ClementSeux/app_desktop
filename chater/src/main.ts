import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from "electron";
import io from "socket.io-client";
import path from "path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const socket = io("ws://localhost:3000");

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(
            path.join(
                __dirname,
                `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
            )
        );
    }

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    const handleMessages = (msg: unknown, sender: string) => {
        console.log("Handling message from main", msg, sender);

        mainWindow.webContents.send("socket-message", msg, sender);
    };

    socket.on("message", handleMessages);
    mainWindow.on("close", () => {
        socket.off("message", handleMessages);
    });

    ipcMain.on("socket-message", (_, msg, sender) => {
        sender = "Clement";
        console.log("Sending message from main:", msg, sender);
        socket.emit("message", msg, sender);
    });
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on("ready", createWindow);

let tray;
app.whenReady().then(() => {
    const icon = nativeImage.createFromPath("./assets/icon.png");

    console.log("img", icon.isEmpty());
    tray = new Tray(icon);

    const contextMenu = Menu.buildFromTemplate([
        { label: "Item1", type: "radio" },
        { label: "Item2", type: "radio" },
        { label: "Item3", type: "radio", checked: true },
        { label: "Item4", type: "radio" },
    ]);

    tray.setContextMenu(contextMenu);

    tray.setToolTip("This is my application");
    tray.setTitle("This is my title");
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {});

app.on("activate", () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
