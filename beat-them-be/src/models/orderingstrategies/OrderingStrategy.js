"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NumberCard_1 = require("../../enums/NumberCard");
const Suit_1 = require("../../enums/Suit");
class OrderingStrategy {
    // INITIALIZER
    constructor() {
        this.numberCardRank = new Map();
        this.suitRank = new Map();
        this.setDefaultNumberRank();
        this.setDefaultSuitRank();
    }
    setDefaultNumberRank() {
        this.numberCardRank.set(NumberCard_1.NumberCard.ONE, 1);
        this.numberCardRank.set(NumberCard_1.NumberCard.TWO, 2);
        this.numberCardRank.set(NumberCard_1.NumberCard.THREE, 3);
        this.numberCardRank.set(NumberCard_1.NumberCard.FOUR, 4);
        this.numberCardRank.set(NumberCard_1.NumberCard.FIVE, 5);
        this.numberCardRank.set(NumberCard_1.NumberCard.SIX, 6);
        this.numberCardRank.set(NumberCard_1.NumberCard.SEVEN, 7);
        this.numberCardRank.set(NumberCard_1.NumberCard.EIGHT, 8);
        this.numberCardRank.set(NumberCard_1.NumberCard.NINE, 9);
        this.numberCardRank.set(NumberCard_1.NumberCard.TEN, 10);
        this.numberCardRank.set(NumberCard_1.NumberCard.JACK, 11);
        this.numberCardRank.set(NumberCard_1.NumberCard.QUEEN, 12);
        this.numberCardRank.set(NumberCard_1.NumberCard.KING, 13);
        this.numberCardRank.set(NumberCard_1.NumberCard.ACE, 14);
    }
    setDefaultSuitRank() {
        this.suitRank.set(Suit_1.Suit.DIAMONDS, 1);
        this.suitRank.set(Suit_1.Suit.CLUBS, 2);
        this.suitRank.set(Suit_1.Suit.HEARTS, 3);
        this.suitRank.set(Suit_1.Suit.SPADES, 4);
    }
    // GETTER AND SETTER
    deleteFromNumberCardRank(key) {
        this.numberCardRank.delete(key);
    }
    addToNumberCardRank(key, value) {
        this.numberCardRank.set(key, value);
    }
    setSuitRank(key, value) {
        this.suitRank.set(key, value);
    }
    getNumberCardRank() {
        return this.numberCardRank;
    }
    getSuitRank() {
        return this.suitRank;
    }
}
exports.default = OrderingStrategy;
