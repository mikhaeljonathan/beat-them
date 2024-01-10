import Card from '../cards/Card';
import CapsaOrderingStrategy from '../orderingstrategies/CapsaOrderingStrategy';

export default abstract class Deal {
    private cards: Card[];
    private capsaOrderingStrategy: CapsaOrderingStrategy = new CapsaOrderingStrategy();

    // INITIALIZER
    constructor(cards: Card[]) {
        this.cards = cards;
    }

    // ABSTRACT METHODS
    public abstract isTheSameType(deal: Deal): boolean

    public abstract isGreaterThan(deal: Deal): boolean

    // GETTER METHODS
    public getCards(): Card[] {
        return this.cards;
    }

    public getCardAt(index: number): Card {
        return this.cards[index];
    }

    public getCapsaOrderingStrategy(): CapsaOrderingStrategy {
        return this.capsaOrderingStrategy;
    }
}