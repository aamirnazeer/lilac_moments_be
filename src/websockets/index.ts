import { WebSocketServer, Server } from "ws";
import { Server as httpServer } from "node:http";

export const initializeWebSocket = (server: httpServer) => {
  const chatWS = new WebSocketServer({ server, path: "/chat" });
  chat(chatWS);
};

const chat = (server: Server) => {
  server.on("connection", (connection, request) => {
    console.log("a user connected");
    connection.send("Welcome to the chatWS");
    connection.on("message", (message) => {
      console.log(message.toString());
      connection.send(message.toString() + "kuku");
    });
    connection.on("close", () => {
      console.log("connection close");
    });
  });
};
