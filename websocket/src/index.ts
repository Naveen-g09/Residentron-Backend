import { Server } from "socket.io";

const io = new Server({
    cors: {
    origin: ["*"]
    }
});

io.on("connection", (socket) => {
    console.log("New connection", socket.id);
    //TODO: Add event listeners here, this would hold a conversation between the client and the server and all the residents of the society, should be able to see the conversation. save them in a database and retrieve them when needed. and flush after a week or so.
    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    });

});

console.log("Server running on port 3000");
io.listen(3000);

