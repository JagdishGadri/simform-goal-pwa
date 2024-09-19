const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.WS_PORT || 8080 });

const clients = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    const parsedMessage = JSON.parse(message);
    if (parsedMessage?.type === 'connection') {
      clients.set(parsedMessage.connectedUserId, ws);
    }

    if (parsedMessage.recepientId) {
      const targetClient = clients.get(parsedMessage.recepientId);
      if (targetClient) {
        targetClient.send(
          JSON.stringify({
            receiverId: parsedMessage.senderId,
            content: parsedMessage.content
          })
        );
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
