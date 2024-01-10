import { sortCapsaCardFunction } from '../../Utilities';
import Deal from './Deal';
import Card from '../cards/Card';
import { Package } from '../../enums/Package';
import { Suit } from '../../enums/Suit';
import { NumberCard } from '../../enums/NumberCard';

export default class PackageDeal extends Deal {

    private package: Package = Package.NONE;
    private anchorNumber: number = -1;
    private capsaNumberCardRank: Map<NumberCard, number>;

    // INITIALIZER
    constructor(cards: Card[]) {
        super(cards);
        this.getCards().sort(sortCapsaCardFunction);
        this.validate();
        this.capsaNumberCardRank = this.getCapsaOrderingStrategy().getNumberCardRank();
    }

    private validate() {
        this.validateLength();
        this.validateDuplicate();
        if (!this.isAValidPackage()) throw "not a valid package";
    }

    private validateLength(): void {
        if (this.getCards().length !== 5) throw "Not a valid package";
    }

    private validateDuplicate(): void {
        for (let i = 0; i < 5; i++) {
            for (let j = i + 1; j < 5; j++) {
                if (this.getCardAt(i).sameWith(this.getCardAt(j))) {
                    throw "Package contains duplicate";
                }
            }
        }
    }

    private isAValidPackage(): boolean {
        if (this.isAValidStraightFlush()) {
            this.package = Package.STRAIGHTFLUSH;
            return true;
        }

        if (this.isAValidStraight()) {
            this.package = Package.STRAIGHT;
            return true;
        }

        if (this.isAValidFlush()) {
            this.package = Package.FLUSH;
            return true;
        }

        if (this.isAValidFullHouse()) {
            this.package = Package.FULLHOUSE;
            return true;
        }

        if (this.isAValidFourOfAKind()) {
            this.package = Package.FOUROFAKIND;
            return true;
        }

        return false;
    }

    private isAValidStraightFlush(): boolean {
        return this.isAValidStraight() && this.isAValidFlush();
    }

    private isAValidStraight(): boolean {
        for (let i = 1; i < 5; i++) {
            const currentCardNumber: NumberCard = this.getCardAt(i).getNumberCard();
            const previousCardNumber: NumberCard = this.getCardAt(i - 1).getNumberCard();

            const numberValueOfCurrentCard: number = this.capsaNumberCardRank.get(currentCardNumber) ?? -1;
            const numberValueOfPreviousCard: number = this.capsaNumberCardRank.get(previousCardNumber) ?? -1;

            if (numberValueOfCurrentCard - numberValueOfPreviousCard !== 1) {
                return false;
            }
        }
        return true;
    }

    private isAValidFlush(): boolean {
        const firstCardSuit: Suit = this.getCardAt(0).getSuit();
        for (let card of this.getCards()) {
            if (card.getSuit() !== firstCardSuit) {
                return false;
            }
        }
        return true;
    }

    private isAValidFullHouse(): boolean {
        const counts: {
            [key: number]: number
        } = {};

        for (let card of this.getCards()) {
            const currentNumber: number = this.capsaNumberCardRank.get(card.getNumberCard()) ?? -1;
            counts[currentNumber] = (counts[currentNumber] || 0) + 1;
        }

        let containsThrees: boolean = false;
        let containsPair: boolean = false;

        for (const i in counts) {
            if (counts[i] === 3) {
                this.anchorNumber = Number(i);
                containsThrees = true;
            } else if (counts[i] === 2) {
                containsPair = true;
            }
        }
    
        return containsThrees && containsPair;
    }

    private isAValidFourOfAKind(): boolean {
        const counts: {
            [key: number]: number
        } = {};

        for (let card of this.getCards()) {
            const currentNumber: number = this.capsaNumberCardRank.get(card.getNumberCard()) ?? -1;
            counts[currentNumber] = (counts[currentNumber] || 0) + 1;
        }

        let containsFours: boolean = false;
        let containsSingle: boolean = false;

        for (let i in counts) {
            if (counts[i] === 4) {
                this.anchorNumber = Number(i);
                containsFours = true;
            } else if (counts[i] === 1) {
                containsSingle = true;
            }
        }
    
        return containsFours && containsSingle;
    }

    // OVERRIDEN METHODS
    public override isTheSameType(deal: Deal): boolean {
        return (deal instanceof PackageDeal);
    }

    public override isGreaterThan(comparedDeal: Deal): boolean {
        return this.getCapsaOrderingStrategy().isLeftPackageGreater(this, comparedDeal as PackageDeal);
    }

    // GETTER METHODS
    public getPackage(): Package {
        return this.package;
    }

    public getAnchorNumber(): number {
        return this.anchorNumber;
    }

    public getLastCard(): Card {
        return this.getCardAt(4);
    }
}
