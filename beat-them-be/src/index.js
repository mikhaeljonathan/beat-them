"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = require("cors");
const CapsaSession_1 = require("./CapsaSession");
const node_http_1 = require("node:http");
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid");
const express_1 = require("express");
const Player_1 = require("./models/Player");
const app = (0, express_1.default)();
const port = 5000;
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {}
});
const capsaSessions = new Map();
const usernameSocketMapping = new Map();
app.use((0, cors_1.default)());
io.on('connection', (socket) => {
    socket.on('create_session', () => {
        const sessionId = (0, uuid_1.v4)();
        const capsaSession = new CapsaSession_1.default(sessionId);
        capsaSessions.set(sessionId, capsaSession);
        socket.join(sessionId);
        console.info(`Session ${sessionId} created`);
        socket.emit('session_created', sessionId);
    });
    socket.on('join_session', (username, sessionId) => {
        if (username === undefined || username === '' || username === null) {
            socket.emit('username_required');
            return;
        }
        if (usernameSocketMapping.has(username)) {
            socket.emit('username_taken');
            return;
        }
        const capsaSession = capsaSessions.get(sessionId);
        if (capsaSession === undefined) {
            socket.emit('session_not_found');
            return;
        }
        if (capsaSession.getPlayers().length >= 4) {
            socket.broadcast.emit('session_full');
            return;
        }
        capsaSession.joinGame(new Player_1.default(username));
        socket.join(sessionId);
        socket.broadcast.emit('session_joined', sessionId);
        socket.emit('session_joined', sessionId);
        usernameSocketMapping.set(username, socket.id);
        if (capsaSession.getPlayers().length === 4) {
            const firstPlayer = capsaSession.getPlayers()[0];
            console.log(usernameSocketMapping.get(firstPlayer.getUsername()));
            socket.to(usernameSocketMapping.get(firstPlayer.getUsername())).emit('eligible_to_start');
        }
    });
    socket.on('look_for_session', (sessionId) => {
        const capsaSession = capsaSessions.get(sessionId);
        if (capsaSession === undefined) {
            socket.emit('session_not_found');
            return;
        }
        socket.emit('session_found');
        if (capsaSession.isSessionStarted()) {
            socket.emit('game_started', sessionId);
        }
    });
    socket.on('fetch_players', (sessionId) => {
        const capsaSession = capsaSessions.get(sessionId);
        const players = capsaSession.getPlayers();
        const playerUsernames = players.map(player => player.getUsername());
        socket.emit('players_fetched', sessionId, playerUsernames);
    });
    socket.on('start_game', (sessionId) => {
        const capsaSession = capsaSessions.get(sessionId);
        if (capsaSession === undefined) {
            socket.emit('session_not_found');
            return;
        }
        capsaSession.startGame();
        const playerCardMapping = capsaSession.getPlayerCardMapping();
        const currentPlayer = capsaSession;
        // for (const player of room.players) {
        //   socket.to(usernameSocketMapping[player]).emit('initial cards', playerCardMapping);
        //   if (player === currentPlayer) {
        //     socket.to(usernameSocketMapping[player]).emit('your turn');
        //   }
        // }
        socket.broadcast.emit('game_started', sessionId);
    });
    // socket.on('deal card', (username, roomId, cards) => {
    // })
});
server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});
