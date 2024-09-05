"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CapsaOrderingStrategy_1 = require("../orderingstrategies/CapsaOrderingStrategy");
class Deal {
    // INITIALIZER
    constructor(cards) {
        this.capsaOrderingStrategy = new CapsaOrderingStrategy_1.default();
        this.cards = cards;
    }
    // GETTER METHODS
    getCards() {
        return this.cards;
    }
    getCardAt(index) {
        return this.cards[index];
    }
    getCapsaOrderingStrategy() {
        return this.capsaOrderingStrategy;
    }
}
exports.default = Deal;
