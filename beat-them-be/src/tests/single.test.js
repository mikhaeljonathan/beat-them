"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Single_1 = require("../models/deals/Single");
const Suit_1 = require("../enums/Suit");
const NumberCard_1 = require("../enums/NumberCard");
const CapsaCard_1 = require("../models/cards/CapsaCard");
describe('Single test', () => {
    it('should be able to throw error when a single deal not valid', () => {
        const makeASingleDealHasZeroCard = () => {
            const single = new Single_1.default([]);
        };
        expect(makeASingleDealHasZeroCard).toThrow("Not a valid single deal");
        const makeASingleDealHasMoreThanOneCard = () => {
            const single = new Single_1.default([new CapsaCard_1.default(NumberCard_1.NumberCard.ACE, Suit_1.Suit.CLUBS),
                new CapsaCard_1.default(NumberCard_1.NumberCard.ACE, Suit_1.Suit.HEARTS)]);
        };
        expect(makeASingleDealHasMoreThanOneCard).toThrow("Not a valid single deal");
    });
    it('should be able to compare single with different number, same suit', () => {
        const single1 = new Single_1.default([new CapsaCard_1.default(NumberCard_1.NumberCard.KING, Suit_1.Suit.HEARTS)]);
        const single2 = new Single_1.default([new CapsaCard_1.default(NumberCard_1.NumberCard.QUEEN, Suit_1.Suit.HEARTS)]);
        expect(single1.isGreaterThan(single2)).toBe(true);
        expect(single2.isGreaterThan(single1)).toBe(false);
    });
    it('should be able to compare single with same number, different suit', () => {
        const single1 = new Single_1.default([new CapsaCard_1.default(NumberCard_1.NumberCard.TEN, Suit_1.Suit.CLUBS)]);
        const single2 = new Single_1.default([new CapsaCard_1.default(NumberCard_1.NumberCard.TEN, Suit_1.Suit.DIAMONDS)]);
        expect(single1.isGreaterThan(single2)).toBe(true);
        expect(single2.isGreaterThan(single1)).toBe(false);
    });
    it('should not be able to compare single with different number, different suit', () => {
        const single1 = new Single_1.default([new CapsaCard_1.default(NumberCard_1.NumberCard.ACE, Suit_1.Suit.CLUBS)]);
        const single2 = new Single_1.default([new CapsaCard_1.default(NumberCard_1.NumberCard.BIGTWO, Suit_1.Suit.DIAMONDS)]);
        expect(single1.isGreaterThan(single2)).toBe(false);
        expect(single2.isGreaterThan(single1)).toBe(true);
    });
});
