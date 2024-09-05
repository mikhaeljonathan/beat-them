"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortCapsaCardFunction = exports.isArrayContainsACard = exports.shuffleCards = void 0;
const CapsaOrderingStrategy_1 = require("./models/orderingstrategies/CapsaOrderingStrategy");
const shuffleCards = (cards) => {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
};
exports.shuffleCards = shuffleCards;
const isArrayContainsACard = (cards, targetCard) => {
    for (const card of cards) {
        if (card.sameWith(targetCard)) {
            return true;
        }
    }
    return false;
};
exports.isArrayContainsACard = isArrayContainsACard;
const sortCapsaCardFunction = (card1, card2) => card1.isGreaterThan(card2, new CapsaOrderingStrategy_1.default()) ? 1 : -1;
exports.sortCapsaCardFunction = sortCapsaCardFunction;
