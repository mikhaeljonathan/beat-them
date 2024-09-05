"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OrderingStrategy_1 = require("./OrderingStrategy");
const NumberCard_1 = require("../../enums/NumberCard");
const Package_1 = require("../../enums/Package");
const Utilities_1 = require("../../Utilities");
class CapsaOrderingStrategy extends OrderingStrategy_1.default {
    // INITIALIZER
    constructor() {
        super();
        this.packageRank = new Map();
        this.setNumberCardRank();
        this.capsaNumberCardRank = this.getNumberCardRank();
        this.capsaSuitRank = this.getSuitRank();
        this.setPackageRank();
    }
    setNumberCardRank() {
        this.addToNumberCardRank(NumberCard_1.NumberCard.BIGTWO, 15);
    }
    setPackageRank() {
        this.packageRank.set(Package_1.Package.STRAIGHT, 1);
        this.packageRank.set(Package_1.Package.FLUSH, 2);
        this.packageRank.set(Package_1.Package.FULLHOUSE, 3);
        this.packageRank.set(Package_1.Package.FOUROFAKIND, 4);
        this.packageRank.set(Package_1.Package.STRAIGHTFLUSH, 5);
        this.packageRank.set(Package_1.Package.ROYALFLUSH, 6);
    }
    // OVERRIDEN METHODS
    isLeftCardGreater(leftCard, rightCard) {
        var _a, _b, _c, _d;
        let leftCardNumberValue = (_a = this.capsaNumberCardRank.get(leftCard.getNumberCard())) !== null && _a !== void 0 ? _a : -1;
        let leftCardSuitValue = (_b = this.capsaSuitRank.get(leftCard.getSuit())) !== null && _b !== void 0 ? _b : -1;
        let rightCardNumberValue = (_c = this.capsaNumberCardRank.get(rightCard.getNumberCard())) !== null && _c !== void 0 ? _c : -1;
        let rightCardSuitValue = (_d = this.capsaSuitRank.get(rightCard.getSuit())) !== null && _d !== void 0 ? _d : -1;
        if (leftCardNumberValue > rightCardNumberValue) {
            return true;
        }
        else if (leftCardNumberValue == rightCardNumberValue) {
            return leftCardSuitValue >= rightCardSuitValue;
        }
        else {
            return false;
        }
    }
    // COMPARISON METHODS
    isLeftPackageGreater(leftDeal, rightDeal) {
        var _a, _b;
        const leftPackageVal = (_a = this.packageRank.get(leftDeal.getPackage())) !== null && _a !== void 0 ? _a : -1;
        const rightPackageVal = (_b = this.packageRank.get(rightDeal.getPackage())) !== null && _b !== void 0 ? _b : -1;
        if (leftPackageVal > rightPackageVal)
            return true;
        else if (leftPackageVal === rightPackageVal) {
            switch (leftDeal.getPackage()) {
                case Package_1.Package.STRAIGHTFLUSH:
                    return this.compareStraightFlush(leftDeal, rightDeal);
                case Package_1.Package.FLUSH:
                    return this.compareFlush(leftDeal, rightDeal);
                case Package_1.Package.STRAIGHT:
                    return this.compareStraight(leftDeal, rightDeal);
                case Package_1.Package.FULLHOUSE:
                    return this.compareFullHouse(leftDeal, rightDeal);
                case Package_1.Package.FOUROFAKIND:
                    return this.compareFourOfAKind(leftDeal, rightDeal);
                default:
                    return false;
            }
        }
        return false;
    }
    compareStraight(leftDeal, rightDeal) {
        return leftDeal.getLastCard().isGreaterThan(rightDeal.getLastCard(), this);
    }
    compareStraightFlush(leftDeal, rightDeal) {
        return leftDeal.getLastCard().isGreaterThan(rightDeal.getLastCard(), this);
    }
    compareFullHouse(leftDeal, rightDeal) {
        return leftDeal.getAnchorNumber() > rightDeal.getAnchorNumber();
    }
    compareFourOfAKind(leftDeal, rightDeal) {
        return leftDeal.getAnchorNumber() > rightDeal.getAnchorNumber();
    }
    compareFlush(leftDeal, rightDeal) {
        var _a, _b;
        const leftDealLastCard = leftDeal.getLastCard();
        const rightDealLastCard = rightDeal.getLastCard();
        const leftPackageSuitVal = (_a = this.capsaSuitRank.get(leftDealLastCard.getSuit())) !== null && _a !== void 0 ? _a : -1;
        const rightPackageSuitVal = (_b = this.capsaSuitRank.get(rightDealLastCard.getSuit())) !== null && _b !== void 0 ? _b : -1;
        if (leftPackageSuitVal > rightPackageSuitVal)
            return true;
        else if (leftPackageSuitVal === rightPackageSuitVal)
            return leftDealLastCard.isGreaterThan(rightDealLastCard, this);
        else
            return false;
    }
    isLeftPairGreater(leftPair, rightPair) {
        leftPair.getCards().sort(Utilities_1.sortCapsaCardFunction);
        rightPair.getCards().sort(Utilities_1.sortCapsaCardFunction);
        return leftPair.getCardAt(1).isGreaterThan(rightPair.getCardAt(1), this);
    }
    isLeftSingleGreater(leftSingle, rightSingle) {
        return leftSingle.getCardAt(0).isGreaterThan(rightSingle.getCardAt(0), this);
    }
}
exports.default = CapsaOrderingStrategy;
