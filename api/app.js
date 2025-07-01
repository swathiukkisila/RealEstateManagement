import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import dotenv from "dotenv";

// Load env variables
dotenv.config();

// Import Routes
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import messageRoute from "./routes/message.route.js";

// Initialize Express
const app = express();

// ====== CORS Setup ======
const allowedOrigins = [
  "http://localhost:5173",
  "https://real-estate-management-1rak-lbkli49hy-swathiukkisilas-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Optional: Allow preflight requests
app.options("*", cors());

// Middlewares
app.use(express.json());
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

// ====== HTTP & Socket.IO Server Setup ======
const server = http.createServer(app);

// Socket.IO with CORS
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// ====== Socket.IO Logic ======
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

// ====== Start Server ======
const PORT = process.env.PORT || 8800;
server.listen(PORT, () => {
  console.log(`🚀 Server with API and Socket.IO is running on port ${PORT}`);
});
