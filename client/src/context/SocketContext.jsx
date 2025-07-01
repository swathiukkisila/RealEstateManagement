

import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!socket) {
      const newSocket = io(import.meta.env.VITE_SOCKET_URL);
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  useEffect(() => {
    if (currentUser && socket) {
      socket.emit("newUser", currentUser.id);
      console.log(`📡 Registered user ${currentUser.id} on socket`);

    }
  }, [currentUser, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};