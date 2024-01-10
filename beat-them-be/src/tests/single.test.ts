import Single from '../models/deals/Single';
import { Suit } from '../enums/Suit';
import { NumberCard } from '../enums/NumberCard';
import CapsaCard from '../models/cards/CapsaCard';

describe('Single test', () => {
    it('should be able to throw error when a single deal not valid', () => {
        const makeASingleDealHasZeroCard = () => {
            const single = new Single([]);
        }
        expect(makeASingleDealHasZeroCard).toThrow("Not a valid single deal");

        const makeASingleDealHasMoreThanOneCard = () => {
            const single = new Single([new CapsaCard(NumberCard.ACE, Suit.CLUBS), 
                new CapsaCard(NumberCard.ACE, Suit.HEARTS)]);
        }
        expect(makeASingleDealHasMoreThanOneCard).toThrow("Not a valid single deal");
    });

    it('should be able to compare single with different number, same suit', () => {
        const single1 = new Single([new CapsaCard(NumberCard.KING, Suit.HEARTS)]);
        const single2 = new Single([new CapsaCard(NumberCard.QUEEN, Suit.HEARTS)]);
        expect(single1.isGreaterThan(single2)).toBe(true);
        expect(single2.isGreaterThan(single1)).toBe(false);
    });

    it('should be able to compare single with same number, different suit', () => {
        const single1 = new Single([new CapsaCard(NumberCard.TEN, Suit.CLUBS)]);
        const single2 = new Single([new CapsaCard(NumberCard.TEN, Suit.DIAMONDS)]);
        expect(single1.isGreaterThan(single2)).toBe(true);
        expect(single2.isGreaterThan(single1)).toBe(false);
    });

    it('should not be able to compare single with different number, different suit', () => {
        const single1 = new Single([new CapsaCard(NumberCard.ACE, Suit.CLUBS)]);
        const single2 = new Single([new CapsaCard(NumberCard.BIGTWO, Suit.DIAMONDS)]);
        expect(single1.isGreaterThan(single2)).toBe(false);
        expect(single2.isGreaterThan(single1)).toBe(true);
    });
});

