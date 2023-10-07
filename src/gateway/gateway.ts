import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

@WebSocketGateway(/*{ namespace: 'chat' }*/)
export class Gateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit(): any {
    this.server.on('connection', (socket) => {
      console.log(`Connected to: ${socket.id}`);
    });
  }

  @SubscribeMessage('onMessage')
  onNewMessage(@MessageBody() message: string) {
    console.log(message);
    this.server.emit('onMessage', message);
  }
}
