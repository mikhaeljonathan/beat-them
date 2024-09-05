"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Deal_1 = require("./Deal");
class Single extends Deal_1.default {
    constructor(card) {
        super(card);
        this.validate();
    }
    validate() {
        if (this.getCards().length != 1)
            throw "Not a valid single deal";
    }
    isTheSameType(deal) {
        return (deal instanceof Single);
    }
    isGreaterThan(comparedSingle) {
        return this.getCapsaOrderingStrategy().isLeftSingleGreater(this, comparedSingle);
    }
}
exports.default = Single;
