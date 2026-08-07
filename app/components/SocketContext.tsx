"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  connectSocket: (token: string) => void;
  disconnectSocket: () => void;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  connectSocket: () => {},
  disconnectSocket: () => {},
});

const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const tabClose = () => {
    console.log("socket disconnect started");
    if (socket) {
      console.log("socket is not undefined");
      socket.disconnect();
    }
  };

  const connectSocket = useCallback(
    (token: string) => {
      // Prevent duplicate connections if already connected
      if (socket?.connected) return;

      const socketInstance = io(SOCKET_SERVER_URL, {
        autoConnect: true,
        transports: ["websocket"],
        reconnectionAttempts: 5,
        // 🚀 THIS SENDS THE TOKEN TO client.handshake.auth.token ON THE SERVER
        auth: {
          token: token,
        },
      });

      socketInstance.on("connect", () => setIsConnected(true));
      socketInstance.on("disconnect", () => setIsConnected(false));

      setSocket(socketInstance);
    },
    [socket],
  );

  const disconnectSocket = useCallback(() => {
    if (socket) {
      socket.disconnect();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  window.addEventListener("beforeunload", tabClose);

  // Clean up on entire app unmount
  useEffect(() => {
    return () => {
      tabClose();
      window.removeEventListener("beforeunload", tabClose);
    };
  }, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
        connectSocket,
        disconnectSocket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook to quickly pull the global socket into any component
export const useGlobalSocket = () => useContext(SocketContext);
