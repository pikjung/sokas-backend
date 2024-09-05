import { Server } from 'http';
import WebSocket from 'ws';
import { PrismaClient } from "@prisma/client";


interface ExtendedWebSocket extends WebSocket {
  userId?: string;
  userDetails: { name: string; Role: { name: string; } | null; } | null;
}

const clients: { [key: string]: ExtendedWebSocket } = {}

export const setupWebSocket = (server: Server) => {
  const prisma = new PrismaClient();
  const wss = new WebSocket.Server({ server });

  wss.on('connection', async (ws: ExtendedWebSocket, req) => {
    const userId = req.url?.split('?')[1]?.split('=')[1];

    if (userId) {
      ws.userId = userId;

      try {
        const userDetails = await prisma.user.findUnique({
          select: {
            name: true,
            Role: {
              select: {
                name: true
              }
            }
          },
          where: { id: userId }
        });
        ws.userDetails = userDetails;
        clients[userId] = ws;
        console.log(`User ${userId} connected with details: ${JSON.stringify(userDetails)}`);

        ws.send(JSON.stringify({
          type: 'USER_DETAILS',
          data: userDetails
        }));
      } catch (error) {
        console.error(`Failed to get user details for ${userId}:`, error);
      }

      console.log('New client connected');

      ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send(`Server received: ${message}`);
      });

      ws.on('close', (code, reason) => {
        if (userId) {
          delete clients[userId];
          console.log(`User ${userId} disconnected. Code: ${code}, Reason: ${reason}`);
        } else {
          console.log(`A client disconnected. Code: ${code}, Reason: ${reason}`);
        }
      });
    }

  });
};

// Fungsi untuk mengirim notifikasi ke pengguna tertentu
export const sendNotificationToUser = (userId: string, status: string, title: string, message: string) => {
  const client = clients[userId];
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify({ message: message, status: status, title: title }));
  }
};

// Fungsi untuk mendapatkan daftar userId yang terkoneksi
export const getConnectedUsers = (): string[] => {
  return Object.keys(clients);
};
