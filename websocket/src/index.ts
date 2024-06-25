import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = 4000;

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

interface ChatGroup {
  id: number;
  currentGroupName: string;
  messages: any[]; 
}

let chatgroups: ChatGroup[] = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

io.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);

  socket.on("getAllGroups", () => {
    socket.emit("groupList", chatgroups);
  });

  socket.on("createNewGroup", (currentGroupName: string) => {
    console.log(currentGroupName);
    chatgroups.unshift({
      id: chatgroups.length + 1,
      currentGroupName,
      messages: [],
    });
    socket.emit("groupList", chatgroups);
  });

  socket.on("findGroup", (id: number) => {
    const filteredGroup = chatgroups.filter((item) => item.id === id);
    if (filteredGroup.length > 0) {
      socket.emit("foundGroup", filteredGroup[0].messages);
    }
  });

  socket.on("newChatMessage", (data: any) => {
    const { currentChatMesage, groupIdentifier, currentUser, timeData } = data;
    const filteredGroup = chatgroups.filter(
      (item) => item.id === groupIdentifier
    );
    if (filteredGroup.length > 0) {
      const newMessage = {
        id: createUniqueId(),
        text: currentChatMesage,
        currentUser,
        time: `${timeData.hr}:${timeData.mins}`,
      };
  
      socket
        .to(filteredGroup[0].currentGroupName)
        .emit("groupMessage", newMessage);
      filteredGroup[0].messages.push(newMessage);
      socket.emit("groupList", chatgroups);
      socket.emit("foundGroup", filteredGroup[0].messages);
    }
  });
});

app.get("/api", (req, res) => {
  res.json(chatgroups);
});

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
