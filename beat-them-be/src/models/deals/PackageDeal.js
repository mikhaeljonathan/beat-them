"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Utilities_1 = require("../../Utilities");
const Deal_1 = require("./Deal");
const Package_1 = require("../../enums/Package");
class PackageDeal extends Deal_1.default {
    // INITIALIZER
    constructor(cards) {
        super(cards);
        this.package = Package_1.Package.NONE;
        this.anchorNumber = -1;
        this.getCards().sort(Utilities_1.sortCapsaCardFunction);
        this.validate();
        this.capsaNumberCardRank = this.getCapsaOrderingStrategy().getNumberCardRank();
    }
    validate() {
        this.validateLength();
        this.validateDuplicate();
        if (!this.isAValidPackage())
            throw "not a valid package";
    }
    validateLength() {
        if (this.getCards().length !== 5)
            throw "Not a valid package";
    }
    validateDuplicate() {
        for (let i = 0; i < 5; i++) {
            for (let j = i + 1; j < 5; j++) {
                if (this.getCardAt(i).sameWith(this.getCardAt(j))) {
                    throw "Package contains duplicate";
                }
            }
        }
    }
    isAValidPackage() {
        if (this.isAValidStraightFlush()) {
            this.package = Package_1.Package.STRAIGHTFLUSH;
            return true;
        }
        if (this.isAValidStraight()) {
            this.package = Package_1.Package.STRAIGHT;
            return true;
        }
        if (this.isAValidFlush()) {
            this.package = Package_1.Package.FLUSH;
            return true;
        }
        if (this.isAValidFullHouse()) {
            this.package = Package_1.Package.FULLHOUSE;
            return true;
        }
        if (this.isAValidFourOfAKind()) {
            this.package = Package_1.Package.FOUROFAKIND;
            return true;
        }
        return false;
    }
    isAValidStraightFlush() {
        return this.isAValidStraight() && this.isAValidFlush();
    }
    isAValidStraight() {
        var _a, _b;
        for (let i = 1; i < 5; i++) {
            const currentCardNumber = this.getCardAt(i).getNumberCard();
            const previousCardNumber = this.getCardAt(i - 1).getNumberCard();
            const numberValueOfCurrentCard = (_a = this.capsaNumberCardRank.get(currentCardNumber)) !== null && _a !== void 0 ? _a : -1;
            const numberValueOfPreviousCard = (_b = this.capsaNumberCardRank.get(previousCardNumber)) !== null && _b !== void 0 ? _b : -1;
            if (numberValueOfCurrentCard - numberValueOfPreviousCard !== 1) {
                return false;
            }
        }
        return true;
    }
    isAValidFlush() {
        const firstCardSuit = this.getCardAt(0).getSuit();
        for (let card of this.getCards()) {
            if (card.getSuit() !== firstCardSuit) {
                return false;
            }
        }
        return true;
    }
    isAValidFullHouse() {
        var _a;
        const counts = {};
        for (let card of this.getCards()) {
            const currentNumber = (_a = this.capsaNumberCardRank.get(card.getNumberCard())) !== null && _a !== void 0 ? _a : -1;
            counts[currentNumber] = (counts[currentNumber] || 0) + 1;
        }
        let containsThrees = false;
        let containsPair = false;
        for (const i in counts) {
            if (counts[i] === 3) {
                this.anchorNumber = Number(i);
                containsThrees = true;
            }
            else if (counts[i] === 2) {
                containsPair = true;
            }
        }
        return containsThrees && containsPair;
    }
    isAValidFourOfAKind() {
        var _a;
        const counts = {};
        for (let card of this.getCards()) {
            const currentNumber = (_a = this.capsaNumberCardRank.get(card.getNumberCard())) !== null && _a !== void 0 ? _a : -1;
            counts[currentNumber] = (counts[currentNumber] || 0) + 1;
        }
        let containsFours = false;
        let containsSingle = false;
        for (let i in counts) {
            if (counts[i] === 4) {
                this.anchorNumber = Number(i);
                containsFours = true;
            }
            else if (counts[i] === 1) {
                containsSingle = true;
            }
        }
        return containsFours && containsSingle;
    }
    // OVERRIDEN METHODS
    isTheSameType(deal) {
        return (deal instanceof PackageDeal);
    }
    isGreaterThan(comparedDeal) {
        return this.getCapsaOrderingStrategy().isLeftPackageGreater(this, comparedDeal);
    }
    // GETTER METHODS
    getPackage() {
        return this.package;
    }
    getAnchorNumber() {
        return this.anchorNumber;
    }
    getLastCard() {
        return this.getCardAt(4);
    }
}
exports.default = PackageDeal;
