"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deal_1 = require("./Deal");
class Pair extends Deal_1.default {
    constructor(cards) {
        super(cards);
        this.validate();
    }
    validate() {
        if (this.getCards().length != 2)
            throw "Not a valid pair";
        const firstCard = this.getCardAt(0);
        const secondCard = this.getCardAt(1);
        if (firstCard.sameWith(secondCard))
            throw "Cards contain duplicate";
        if (firstCard.getNumberCard() !== secondCard.getNumberCard())
            throw "Not a valid pair";
    }
    isTheSameType(deal) {
        return (deal instanceof Pair);
    }
    isGreaterThan(comparedDeal) {
        return this.getCapsaOrderingStrategy().isLeftPairGreater(this, comparedDeal);
    }
}
exports.default = Pair;
