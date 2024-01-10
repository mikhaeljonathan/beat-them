import Player from "../models/Player";
import CapsaSession from "../CapsaSession";
import { v4 as uuidv4 } from "uuid";

describe('CapsaSession test', () => {

    const capsaSession = new CapsaSession(uuidv4());

    it("Create a capsa session with 4 players", () => {
        const player1 = new Player("player1");
        const player2 = new Player("player2");
        const player3 = new Player("player3");
        const player4 = new Player("player4");

        capsaSession.joinGame(player1);
        capsaSession.joinGame(player2);
        capsaSession.joinGame(player3);
        capsaSession.joinGame(player4);
        
        expect(capsaSession.getPlayers().length).toBe(4); 
    });

    it("Start a game", () => {
        capsaSession.startGame();
        expect(capsaSession.isSessionStarted()).toBe(true);
    })

    it("Check if every player has the same amount of cards", () => {
        const playerCardMapping = capsaSession.getPlayerCardMapping();
        // console.log(playerCardMapping);
        for (const [player, cards] of playerCardMapping.entries()) {
            expect(playerCardMapping.get(player)?.length).toBe(13)
        }
    })


});