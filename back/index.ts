import { Server } from "socket.io";

function main() {
    const convos = [
        { users: ["Clement", "Alice"], id: 4526 },
        { users: ["Clement", "Thanos"], id: 4529 },
    ];
    const port = 3000;

    const io = new Server(port, {
        cors: {
            origin: "*",
        },
    });

    io.on("connection", (socket) => {
        console.log("a user connected");
        for (const convo of convos) {
            socket.on(`message-${convo.id}`, (msg, sender) => {
                console.log("message: " + msg + " from " + sender);
                // io.emit(`new-convo`, convo.id);
                io.emit(`message-${convo.id}`, msg, sender);
            });
        }
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
