"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./Card");
const CapsaOrderingStrategy_1 = require("../orderingstrategies/CapsaOrderingStrategy");
class CapsaCard extends Card_1.default {
    constructor(numberCard, suit) {
        super(numberCard, suit);
    }
    isGreaterThan(comparedCard) {
        return super.isGreaterThan(comparedCard, new CapsaOrderingStrategy_1.default());
    }
}
exports.default = CapsaCard;
