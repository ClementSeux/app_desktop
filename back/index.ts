import { Server } from "socket.io";

function main() {
    const port = 3000;

    const io = new Server(port, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected");
        socket.on("message", (msg, sender) => {
            console.log("message: " + msg + " from " + sender);
            io.emit("message", msg, sender);
        });
    });

    process.on("SIGINT", () => {
        console.log("Bye bye!");
        process.exit();
    });

    process.on("SIGTERM", () => {
        console.log("Bye bye!");
        process.exit();
    });

    process.on("uncaughtException", (err) => {
        console.error(err);
        process.exit(1);
    });

    console.log(`Server running on port ${port}`);
}

main();
