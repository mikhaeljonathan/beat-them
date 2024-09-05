"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CapsaCard_1 = require("./models/cards/CapsaCard");
const Utilities_1 = require("./Utilities");
const NumberCard_1 = require("./enums/NumberCard");
const Suit_1 = require("./enums/Suit");
class CapsaSession {
    constructor(sessionId) {
        this.sessionId = undefined;
        this.players = [];
        this.cards = [];
        this.playerCardMapping = new Map();
        this.table = undefined;
        this.currentPlayer = undefined;
        this.isStarted = false;
        this.sessionId = sessionId;
    }
    joinGame(player) {
        if (this.players.length >= 4)
            throw "The game is full";
        this.players.push(player);
    }
    startGame() {
        this.generateCards();
        this.shuffleCards();
        this.assignCardsToPlayers();
        this.pickCurrentPlayer();
        this.isStarted = true;
    }
    generateCards() {
        const numbers = [NumberCard_1.NumberCard.THREE, NumberCard_1.NumberCard.FOUR, NumberCard_1.NumberCard.FIVE, NumberCard_1.NumberCard.SIX,
            NumberCard_1.NumberCard.SEVEN, NumberCard_1.NumberCard.EIGHT, NumberCard_1.NumberCard.NINE, NumberCard_1.NumberCard.TEN, NumberCard_1.NumberCard.JACK,
            NumberCard_1.NumberCard.QUEEN, NumberCard_1.NumberCard.KING, NumberCard_1.NumberCard.ACE, NumberCard_1.NumberCard.BIGTWO];
        const suits = [Suit_1.Suit.DIAMONDS, Suit_1.Suit.CLUBS, Suit_1.Suit.HEARTS, Suit_1.Suit.SPADES];
        for (const number of numbers) {
            for (const suit of suits) {
                this.cards.push(new CapsaCard_1.default(number, suit));
            }
        }
    }
    shuffleCards() {
        this.cards = (0, Utilities_1.shuffleCards)(this.cards);
    }
    assignCardsToPlayers() {
        var _a;
        let playerIdx = 0;
        for (const player of this.players) {
            const numOfCardPerPlayer = this.cards.length / this.players.length; // 52 / 4 = 13
            let cardIdx = playerIdx * numOfCardPerPlayer;
            this.playerCardMapping.set(player, []);
            while (cardIdx < (playerIdx + 1) * numOfCardPerPlayer) {
                const currentPlayerCards = (_a = this.playerCardMapping.get(player)) !== null && _a !== void 0 ? _a : [];
                const card = this.cards[cardIdx];
                currentPlayerCards.push(card);
                this.playerCardMapping.set(player, currentPlayerCards);
                cardIdx++;
            }
            playerIdx++;
        }
    }
    pickCurrentPlayer() {
        var _a;
        for (const player of this.players) {
            const playerCards = (_a = this.playerCardMapping.get(player)) !== null && _a !== void 0 ? _a : [];
            const threeDiamondCard = new CapsaCard_1.default(NumberCard_1.NumberCard.THREE, Suit_1.Suit.DIAMONDS);
            if ((0, Utilities_1.isArrayContainsACard)(playerCards, threeDiamondCard)) {
                this.currentPlayer = player;
                return;
            }
        }
    }
    sortPlayerCards(player) {
        var _a, _b;
        return (_b = (_a = this.playerCardMapping.get(player)) === null || _a === void 0 ? void 0 : _a.sort(Utilities_1.sortCapsaCardFunction)) !== null && _b !== void 0 ? _b : [];
    }
    nextPlayer() {
        if (this.currentPlayer === undefined)
            throw "Current player is undefined";
        const indexOfCurrentPlayer = this.players.indexOf(this.currentPlayer);
        const numOfPlayers = this.players.length;
        this.currentPlayer = this.players[(indexOfCurrentPlayer + 1) % numOfPlayers];
    }
    deal(cardsDeal) {
        // TODO: is the card is valid from players hand
        if (this.table === undefined) {
            this.checkIfContainsThreeOfDiamonds(cardsDeal);
        }
        else {
            this.checkIfTheMovementValid(cardsDeal);
        }
        this.table = cardsDeal;
        console.debug(this.currentPlayer + " deals a " + cardsDeal.constructor.name);
        // TODO: take out from players hand
        this.nextPlayer();
        console.debug("Current player now is " + this.currentPlayer);
        ;
    }
    checkIfContainsThreeOfDiamonds(cardsDeal) {
        if (!(0, Utilities_1.isArrayContainsACard)(cardsDeal.getCards(), new CapsaCard_1.default(NumberCard_1.NumberCard.THREE, Suit_1.Suit.DIAMONDS))) {
            throw "Invalid movement, deal the three of diamonds first";
        }
    }
    checkIfTheMovementValid(cardsDeal) {
        console.debug("Current deal: ", cardsDeal);
        console.debug("Current table: ", this.table);
        if (!cardsDeal.isTheSameType(this.table))
            throw "Invalid movement, not the same deal";
        if (!cardsDeal.isGreaterThan(this.table))
            throw "Invalid movement, the deal is lower than the table";
    }
    getPlayers() {
        return this.players;
    }
    isSessionStarted() {
        return this.isStarted;
    }
    getPlayerCardMapping() {
        return this.playerCardMapping;
    }
}
exports.default = CapsaSession;
