import { Suit } from '../../enums/Suit';
import { NumberCard } from '../../enums/NumberCard';
import OrderingStrategy from '../orderingstrategies/OrderingStrategy';

export default abstract class Card {
    private numberCard: NumberCard;
    private suit: Suit;

	constructor(numberCard: NumberCard, suit: Suit) {
        this.numberCard = numberCard;
        this.suit = suit;
    }

    public sameWith(card: Card): boolean {
        if (this.numberCard === card.numberCard && this.suit === card.suit) {
            return true;
        } else {
            return false;
        }
    }

    public isGreaterThan(comparedCard: Card, orderingStrategy: OrderingStrategy): boolean {
        return orderingStrategy.isLeftCardGreater(this, comparedCard);
    }

    public getNumberCard(): NumberCard {
        return this.numberCard;
    }

    public getSuit(): Suit {
        return this.suit;
    }

    public toString(): String {
        return `${this.numberCard} of ${this.suit}`;
    }
}