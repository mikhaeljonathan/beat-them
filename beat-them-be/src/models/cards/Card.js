"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Card {
    constructor(numberCard, suit) {
        this.numberCard = numberCard;
        this.suit = suit;
    }
    sameWith(card) {
        if (this.numberCard === card.numberCard && this.suit === card.suit) {
            return true;
        }
        else {
            return false;
        }
    }
    isGreaterThan(comparedCard, orderingStrategy) {
        return orderingStrategy.isLeftCardGreater(this, comparedCard);
    }
    getNumberCard() {
        return this.numberCard;
    }
    getSuit() {
        return this.suit;
    }
    toString() {
        return `${this.numberCard} of ${this.suit}`;
    }
}
exports.default = Card;
