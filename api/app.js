import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";

// Import Routes
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

// Initialize Express
const app = express();

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://real-estate-management-1rak-lbkli49hy-swathiukkisilas-projects.vercel.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO server on top of Express HTTP server
const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://real-estate-management-1rak-lbkli49hy-swathiukkisilas-projects.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Socket.io logic
let onlineUsers = [];

const addUser = (userId, socketId) => {
  if (!onlineUsers.some((user) => user.userId === userId)) {
    onlineUsers.push({ userId, socketId });
  }
};

const removeUser = (socketId) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => onlineUsers.find((user) => user.userId === userId);

io.on("connection", (socket) => {
  console.log(`⚡ New user connected: ${socket.id}`);

  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
    console.log(`✅ User ${userId} is now online.`);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    console.log(`📩 Message from ${data.userId} to ${receiverId}:`, data.text);

    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      console.log(`✅ Message sent to ${receiverId}`);
    } else {
      console.log(`❌ Receiver ${receiverId} is offline. Message not sent.`);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    removeUser(socket.id);
  });
});

// Start server on 8800
server.listen(8800, () => {
  console.log("🚀 Server with API and Socket.IO is running on port 8800");
});
