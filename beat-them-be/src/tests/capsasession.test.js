"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Player_1 = require("../models/Player");
const CapsaSession_1 = require("../CapsaSession");
const uuid_1 = require("uuid");
describe('CapsaSession test', () => {
    const capsaSession = new CapsaSession_1.default((0, uuid_1.v4)());
    it("Create a capsa session with 4 players", () => {
        const player1 = new Player_1.default("player1");
        const player2 = new Player_1.default("player2");
        const player3 = new Player_1.default("player3");
        const player4 = new Player_1.default("player4");
        capsaSession.joinGame(player1);
        capsaSession.joinGame(player2);
        capsaSession.joinGame(player3);
        capsaSession.joinGame(player4);
        expect(capsaSession.getPlayers().length).toBe(4);
    });
    it("Start a game", () => {
        capsaSession.startGame();
        expect(capsaSession.isSessionStarted()).toBe(true);
    });
    it("Check if every player has the same amount of cards", () => {
        var _a;
        const playerCardMapping = capsaSession.getPlayerCardMapping();
        // console.log(playerCardMapping);
        for (const [player, cards] of playerCardMapping.entries()) {
            expect((_a = playerCardMapping.get(player)) === null || _a === void 0 ? void 0 : _a.length).toBe(13);
        }
    });
});
