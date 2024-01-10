import Deal from './Deal';
import Card from '../cards/Card';

export default class Pair extends Deal {

    constructor(cards: Card[]) {
        super(cards);
        this.validate();
    }

    private validate(): void {
        if (this.getCards().length != 2) throw "Not a valid pair";

        const firstCard: Card = this.getCardAt(0);
        const secondCard: Card = this.getCardAt(1);

        if (firstCard.sameWith(secondCard)) throw "Cards contain duplicate";
        if (firstCard.getNumberCard() !== secondCard.getNumberCard()) throw "Not a valid pair";
    }

    public override isTheSameType(deal: Deal): boolean {
        return (deal instanceof Pair);
    }

    public override isGreaterThan(comparedDeal: Deal): boolean {
        return this.getCapsaOrderingStrategy().isLeftPairGreater(this, comparedDeal as Pair);
    }
    
}