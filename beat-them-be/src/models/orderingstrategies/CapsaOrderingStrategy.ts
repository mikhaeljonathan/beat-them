import OrderingStrategy from "./OrderingStrategy";
import Card from "../cards/Card";
import { NumberCard } from '../../enums/NumberCard';
import { Suit } from "../../enums/Suit";
import { Package } from "../../enums/Package";
import PackageDeal from "../deals/PackageDeal";
import Pair from "../deals/Pair";
import Single from "../deals/Single";
import { sortCapsaCardFunction } from '../../Utilities';

export default class CapsaOrderingStrategy extends OrderingStrategy {
    
    private capsaNumberCardRank: Map<NumberCard, number>;
    private capsaSuitRank: Map<Suit, number>;
    private packageRank: Map<Package, number> = new Map<Package, number>();

    // INITIALIZER
    constructor() {
        super();
        this.setNumberCardRank();
        this.capsaNumberCardRank = this.getNumberCardRank();
        this.capsaSuitRank = this.getSuitRank();
        this.setPackageRank();
    }

    private setNumberCardRank(): void {
        this.addToNumberCardRank(NumberCard.BIGTWO, 15);
    }

    private setPackageRank(): void {
        this.packageRank.set(Package.STRAIGHT, 1);
        this.packageRank.set(Package.FLUSH, 2);
        this.packageRank.set(Package.FULLHOUSE, 3);
        this.packageRank.set(Package.FOUROFAKIND, 4);
        this.packageRank.set(Package.STRAIGHTFLUSH, 5);
        this.packageRank.set(Package.ROYALFLUSH, 6);
    }

    // OVERRIDEN METHODS
    public override isLeftCardGreater(leftCard: Card, rightCard: Card): boolean {
        let leftCardNumberValue: number = this.capsaNumberCardRank.get(leftCard.getNumberCard()) ?? -1;
        let leftCardSuitValue: number = this.capsaSuitRank.get(leftCard.getSuit()) ?? -1;

        let rightCardNumberValue: number = this.capsaNumberCardRank.get(rightCard.getNumberCard()) ?? -1;
        let rightCardSuitValue: number = this.capsaSuitRank.get(rightCard.getSuit()) ?? -1;

        if (leftCardNumberValue > rightCardNumberValue) {
            return true;
        } else if (leftCardNumberValue == rightCardNumberValue) {
            return leftCardSuitValue >= rightCardSuitValue;
        }else {
            return false;
        }
    }

    // COMPARISON METHODS
    public isLeftPackageGreater(leftDeal: PackageDeal, rightDeal: PackageDeal): boolean {
        const leftPackageVal: number = this.packageRank.get(leftDeal.getPackage()) ?? -1;
        const rightPackageVal: number = this.packageRank.get(rightDeal.getPackage()) ?? -1;

        if (leftPackageVal > rightPackageVal) return true;
        else if (leftPackageVal === rightPackageVal) {
            switch (leftDeal.getPackage()) {
                case Package.STRAIGHTFLUSH:
                    return this.compareStraightFlush(leftDeal, rightDeal);
                case Package.FLUSH:
                    return this.compareFlush(leftDeal, rightDeal);
                case Package.STRAIGHT:
                    return this.compareStraight(leftDeal, rightDeal);
                case Package.FULLHOUSE:
                    return this.compareFullHouse(leftDeal, rightDeal);
                case Package.FOUROFAKIND:
                    return this.compareFourOfAKind(leftDeal, rightDeal);
                default:
                    return false;
            }
        }

        return false
    }

    private compareStraight(leftDeal: PackageDeal, rightDeal: PackageDeal): boolean {
        return leftDeal.getLastCard().isGreaterThan(rightDeal.getLastCard(), this);
    }

    private compareStraightFlush(leftDeal: PackageDeal, rightDeal: PackageDeal): boolean {
        return leftDeal.getLastCard().isGreaterThan(rightDeal.getLastCard(), this);
    }

    private compareFullHouse(leftDeal: PackageDeal, rightDeal: PackageDeal): boolean {
        return leftDeal.getAnchorNumber() > rightDeal.getAnchorNumber();
    }
    
    private compareFourOfAKind(leftDeal: PackageDeal, rightDeal: PackageDeal): boolean {
        return leftDeal.getAnchorNumber() > rightDeal.getAnchorNumber();
    }

    private compareFlush(leftDeal: PackageDeal, rightDeal: PackageDeal): boolean {
        const leftDealLastCard: Card = leftDeal.getLastCard();
        const rightDealLastCard : Card = rightDeal.getLastCard();

        const leftPackageSuitVal: number = this.capsaSuitRank.get(leftDealLastCard.getSuit()) ?? -1;
        const rightPackageSuitVal: number = this.capsaSuitRank.get(rightDealLastCard.getSuit()) ?? -1;

        if (leftPackageSuitVal > rightPackageSuitVal) return true
        else if (leftPackageSuitVal === rightPackageSuitVal) 
            return leftDealLastCard.isGreaterThan(rightDealLastCard, this);
        else return false;
    }

    public isLeftPairGreater(leftPair: Pair, rightPair: Pair) {
        leftPair.getCards().sort(sortCapsaCardFunction);
        rightPair.getCards().sort(sortCapsaCardFunction);
        return leftPair.getCardAt(1).isGreaterThan(rightPair.getCardAt(1), this);
    }

    public isLeftSingleGreater(leftSingle: Single, rightSingle: Single) {
        return leftSingle.getCardAt(0).isGreaterThan(rightSingle.getCardAt(0), this);
    }
       
}