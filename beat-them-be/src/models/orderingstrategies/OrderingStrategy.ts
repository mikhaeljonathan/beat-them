import Card from '../cards/Card';
import { NumberCard } from '../../enums/NumberCard';
import { Suit } from '../../enums/Suit';

export default abstract class OrderingStrategy {
    
    private numberCardRank: Map<NumberCard, number> = new Map();
    private suitRank: Map<Suit, number> = new Map();

    // INITIALIZER
    constructor() {
        this.setDefaultNumberRank();
        this.setDefaultSuitRank();
    }

    private setDefaultNumberRank() {
        this.numberCardRank.set(NumberCard.ONE, 1);
        this.numberCardRank.set(NumberCard.TWO, 2);
        this.numberCardRank.set(NumberCard.THREE, 3);
        this.numberCardRank.set(NumberCard.FOUR, 4);
        this.numberCardRank.set(NumberCard.FIVE, 5);
        this.numberCardRank.set(NumberCard.SIX, 6);
        this.numberCardRank.set(NumberCard.SEVEN, 7);
        this.numberCardRank.set(NumberCard.EIGHT, 8);
        this.numberCardRank.set(NumberCard.NINE, 9);
        this.numberCardRank.set(NumberCard.TEN, 10);
        this.numberCardRank.set(NumberCard.JACK, 11);
        this.numberCardRank.set(NumberCard.QUEEN, 12);
        this.numberCardRank.set(NumberCard.KING, 13);
        this.numberCardRank.set(NumberCard.ACE, 14);
    }

    private setDefaultSuitRank() {
        this.suitRank.set(Suit.DIAMONDS, 1);
        this.suitRank.set(Suit.CLUBS, 2);
        this.suitRank.set(Suit.HEARTS, 3);
        this.suitRank.set(Suit.SPADES, 4);
    }

    // ABSTRACT METHODS
    public abstract isLeftCardGreater(leftCard: Card, rightCard: Card): boolean;

    // GETTER AND SETTER
    public deleteFromNumberCardRank(key: NumberCard): void {
        this.numberCardRank.delete(key);
    }

    public addToNumberCardRank(key: NumberCard, value: number): void {
        this.numberCardRank.set(key, value);
    }

    public setSuitRank(key: Suit, value: number): void {
        this.suitRank.set(key, value);
    }

    public getNumberCardRank(): Map<NumberCard, number> {
        return this.numberCardRank;
    }

    public getSuitRank(): Map<Suit, number> {
        return this.suitRank;
    }
}