import { Server } from "socket.io";

const io = new Server({
    cors: {
    origin: ["*"]
    }
});

io.on("connection", (socket) => {
    console.log("New connection", socket.id);

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    });

});

console.log("Server running on port 3000");
io.listen(3000);

