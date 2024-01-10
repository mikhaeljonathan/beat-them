import Card from "./models/cards/Card";
import CapsaOrderingStrategy from "./models/orderingstrategies/CapsaOrderingStrategy";

const shuffleCards = (cards: Card[]) => { 
    for (let i = cards.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [cards[i], cards[j]] = [cards[j], cards[i]]; 
    } 
    return cards; 
  };

const isArrayContainsACard = (cards: Card[], targetCard: Card): boolean => {
  for (const card of cards) {
    if (card.sameWith(targetCard)) {
      return true;
    }
  }
  return false;
}

const sortCapsaCardFunction = (card1: Card, card2: Card) => card1.isGreaterThan(card2, new CapsaOrderingStrategy()) ? 1 : -1

export { shuffleCards, isArrayContainsACard, sortCapsaCardFunction };