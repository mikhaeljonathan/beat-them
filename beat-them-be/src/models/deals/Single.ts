import Deal from './Deal';
import Card from '../cards/Card';

export default class Single extends Deal {

    constructor(card: Card[]) {
        super(card);
        this.validate();
    }

    private validate(): void {
        if (this.getCards().length != 1) throw "Not a valid single deal";
    }

    public override isTheSameType(deal: Deal): boolean {
        return (deal instanceof Single);
    }

    public override isGreaterThan(comparedSingle: Single): boolean {
        return this.getCapsaOrderingStrategy().isLeftSingleGreater(this, comparedSingle as Single);
    }
}