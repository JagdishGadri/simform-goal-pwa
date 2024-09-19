'use client';
import React, {
  createContext,
  useEffect,
  useContext,
  ReactNode,
  useRef,
  useCallback,
  useState
} from 'react';

interface WebSocketMessage {
  receiverId: string;
  content: string;
}
interface WebSocketContextType {
  socket: WebSocket | null;
  messages: WebSocketMessage[];
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
);

interface WebSocketProviderProps {
  children: ReactNode;
  senderId: string | undefined;
}

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
  senderId
}) => {
  const ws = useRef<WebSocket | null>(null);
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);

  const connectToWebSocket = useCallback(async () => {
    if (process.env.NEXT_PUBLIC_WS_URL) {
      ws.current = new WebSocket(process.env.NEXT_PUBLIC_WS_URL);
      ws.current.onopen = () => {
        if (ws.current)
          ws.current.send(
            JSON.stringify({
              type: 'connection',
              connectedUserId: senderId
            })
          );
      };

      ws.current.onmessage = async (event) => {
        const data = event.data;
        if (data) {
          const parsedMessage: WebSocketMessage = JSON.parse(data);
          setMessages((prevMessages) => [...prevMessages, parsedMessage]);
        }
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.current.onclose = () => {
        // eslint-disable-next-line no-console
        console.log('Disconnected from the WebSocket server');
      };
    }
  }, [senderId]);

  useEffect(() => {
    connectToWebSocket();
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [connectToWebSocket]);

  return (
    <WebSocketContext.Provider
      value={{ socket: ws.current, messages: messages }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = (): WebSocketContextType => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
