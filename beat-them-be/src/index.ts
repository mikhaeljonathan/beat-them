import cors from 'cors';
import CapsaSession from './CapsaSession';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from "uuid";
import express, { Express, Request, Response } from 'express';
import http from 'http';
import Player from './models/Player';

const app: Express = express();
const port: number = 5000;
const server: http.Server = createServer(app);
const io: Server = new Server(server, {
  cors: {}
});

const capsaSessions: Map<string, CapsaSession> = new Map();
const usernameSocketMapping: Map<string, string> = new Map();

app.use(cors());

// app.get('/', (req: Request, res: Response) => {
//   res.send('BEAT-THEM!')
// });

io.on('connection', (socket: any) => {

  socket.on('create_session', (username: string) => {
    if (username === undefined || username === '' || username === null) {
      socket.emit('username_required');
      return;
    }

    const sessionId: string = uuidv4();
    const capsaSession: CapsaSession = new CapsaSession(sessionId);
    capsaSession.joinGame(new Player(username));
    capsaSessions.set(sessionId, capsaSession);

    usernameSocketMapping.set(username, socket.id);
    
    socket.join(sessionId);
    console.info(`Session ${sessionId} created by ${username}`);
    socket.emit('session_created', sessionId);
  });

  socket.on('join_session', (username: string, sessionId: string) => {
    if (username === undefined || username === '' || username === null) {
      socket.emit('username_required');
      return;
    }
      
    const capsaSession: CapsaSession | undefined = capsaSessions.get(sessionId);

    if (capsaSession === undefined) {
      socket.emit('session_not_found');
      return;
    }

    if (capsaSession.getPlayers().length >= 4) {
      socket.broadcast.emit('session_full');
      return;
    }

    capsaSession.joinGame(new Player(username));
    socket.join(sessionId);
    socket.broadcast.emit('session_joined', sessionId, username);
    socket.to(socket.id).emit('session_joined', sessionId, username);
    usernameSocketMapping.set(username, socket.id);

    if (capsaSession.getPlayers().length === 4) {
      const firstPlayer = capsaSession.getPlayers()[0];
      console.log(usernameSocketMapping.get(firstPlayer.getUsername()));
      socket.to(usernameSocketMapping.get(firstPlayer.getUsername())).emit('eligible_to_start');
    }

  });

  socket.on('look_for_session', (sessionId: string) => {
    const capsaSession: CapsaSession | undefined = capsaSessions.get(sessionId);

    if (capsaSession === undefined) {
      socket.emit('session_not_found');
      return;
    }

    socket.emit('session_found');
  });

  socket.on('fetch_players', (sessionId: string) => {
    const capsaSession: CapsaSession = capsaSessions.get(sessionId)!;
    const players: Player[] = capsaSession.getPlayers();
    const playerUsernames = players.map(player => player.getUsername());

    socket.emit('players_fetched', sessionId, playerUsernames);
  });

  socket.on('start_game', (sessionId: string) => {
    // const capsaSession: CapsaSession | undefined = capsaSessions.get(sessionId);

    // if (capsaSession === undefined) throw "Session not found";
    
    // capsaSession.startGame();

    // const playerCardMapping = room.playerCardMapping;
    // const currentPlayer = room.currentPlayer;

    // for (const player of room.players) {
    //   socket.to(usernameSocketMapping[player]).emit('initial cards', playerCardMapping);
    //   if (player === currentPlayer) {
    //     socket.to(usernameSocketMapping[player]).emit('your turn');
    //   }
    // }

  });

  // socket.on('deal card', (username, roomId, cards) => {
    
  // })

  
});

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`)
})

