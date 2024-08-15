import { Server } from 'http';
import WebSocket from 'ws';

interface ExtendedWebSocket extends WebSocket {
  userId?: string;
}

const clients: { [key: string]: ExtendedWebSocket } = {}

export const setupWebSocket = (server: Server) => {
  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws: ExtendedWebSocket, req) => {
    const userId = req.url?.split('?')[1]?.split('=')[1];

    if (userId) {
      ws.userId = userId;
      clients[userId] = ws;
      console.log(`User ${userId} connected`);
    }

    console.log('New client connected');

    ws.on('message', (message) => {
      console.log(`Received message: ${message}`);
      ws.send(`Server received: ${message}`);
    });

    ws.on('close', () => {
      if (userId) {
        delete clients[userId];
        console.log(`User ${userId} disconnected`);
      }
    });
  });
};

// Fungsi untuk mengirim notifikasi ke pengguna tertentu
export const sendNotificationToUser = (userId: string, notification: string) => {
  const client = clients[userId];
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(notification);
  }
};
