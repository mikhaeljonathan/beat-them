import Card from "./Card";
import CapsaOrderingStrategy from "../orderingstrategies/CapsaOrderingStrategy";
import { NumberCard } from "../../enums/NumberCard";
import { Suit } from "../../enums/Suit";

export default class CapsaCard extends Card {

    constructor(numberCard: NumberCard, suit: Suit) {
        super(numberCard, suit);
    }

    public override isGreaterThan(comparedCard: Card): boolean {
        return super.isGreaterThan(comparedCard, new CapsaOrderingStrategy());
    }
}