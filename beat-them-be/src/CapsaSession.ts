import CapsaCard from "./models/cards/CapsaCard";
import { shuffleCards, isArrayContainsACard, sortCapsaCardFunction } from "./Utilities";
import Card from "./models/cards/Card";
import Player from "./models/Player";
import { NumberCard } from "./enums/NumberCard";
import { Suit } from "./enums/Suit";
import Deal from "./models/deals/Deal";


class CapsaSession {

    private sessionId: String | undefined = undefined;
    private players: Player[] = [];
    private cards: Card[] = [];
    private playerCardMapping: Map<Player, Card[]> = new Map();
    private table: Deal | undefined = undefined;
    private currentPlayer: Player | undefined = undefined;
    private isStarted = false;

    constructor(sessionId: string) {
        this.sessionId = sessionId;
    }

    public joinGame(player: Player): void {
        if (this.players.length >= 4)
            throw "The game is full";
        this.players.push(player);
    }

    public startGame(): void {
        this.generateCards();
        this.shuffleCards();
        this.assignCardsToPlayers();
        this.pickCurrentPlayer();
        this.isStarted = true;
    }

    private generateCards(): void{
        const numbers = [NumberCard.THREE, NumberCard.FOUR, NumberCard.FIVE, NumberCard.SIX, 
            NumberCard.SEVEN, NumberCard.EIGHT, NumberCard.NINE, NumberCard.TEN, NumberCard.JACK, 
            NumberCard.QUEEN, NumberCard.KING, NumberCard.ACE, NumberCard.BIGTWO];
        const suits = [Suit.DIAMONDS, Suit.CLUBS, Suit.HEARTS, Suit.SPADES];

        for (const number of numbers) {
            for (const suit of suits) {
                this.cards.push(new CapsaCard(number, suit));
            }
        }
    }

    private shuffleCards(): void {
        this.cards = shuffleCards(this.cards);
    }

    private assignCardsToPlayers(): void {
        let playerIdx = 0;

        for (const player of this.players) {
            const numOfCardPerPlayer: number = this.cards.length / this.players.length; // 52 / 4 = 13
            let cardIdx = playerIdx * numOfCardPerPlayer;
            this.playerCardMapping.set(player, [])

            while (cardIdx < (playerIdx + 1) * numOfCardPerPlayer) {
                const currentPlayerCards: Card[] = this.playerCardMapping.get(player) ?? [];

                const card: Card = this.cards[cardIdx];
                currentPlayerCards.push(card);

                this.playerCardMapping.set(player, currentPlayerCards);
                
                cardIdx++;
            }
            
            playerIdx++;
        }
    }

    private pickCurrentPlayer(): void {
        for (const player of this.players) {
            const playerCards: Card[] = this.playerCardMapping.get(player) ?? [];
            const threeDiamondCard: Card = new CapsaCard(NumberCard.THREE, Suit.DIAMONDS);

            if (isArrayContainsACard(playerCards, threeDiamondCard)) {
                this.currentPlayer = player;
                return;
            }
        }
    }

    public sortPlayerCards(player: Player): Card[] {
        return this.playerCardMapping.get(player)?.sort(sortCapsaCardFunction) ?? [];
    }

    public nextPlayer(): void {
        if (this.currentPlayer === undefined) 
            throw "Current player is undefined";
        const indexOfCurrentPlayer = this.players.indexOf(this.currentPlayer);
        const numOfPlayers = this.players.length;
        this.currentPlayer = this.players[(indexOfCurrentPlayer + 1) % numOfPlayers];
    }

    public deal(cardsDeal: Deal): void {
        // TODO: is the card is valid from players hand

        if (this.table === undefined) {
            this.checkIfContainsThreeOfDiamonds(cardsDeal);
        } else {
            this.checkIfTheMovementValid(cardsDeal);
        }

        this.table = cardsDeal;
        console.debug(this.currentPlayer + " deals a " + cardsDeal.constructor.name);

        // TODO: take out from players hand
        this.nextPlayer();
        console.debug("Current player now is " + this.currentPlayer);;
    }

    private checkIfContainsThreeOfDiamonds(cardsDeal: Deal): void {
        if (!isArrayContainsACard(cardsDeal.getCards(), new CapsaCard(NumberCard.THREE, Suit.DIAMONDS))) {
            throw "Invalid movement, deal the three of diamonds first";
        }
    }

    private checkIfTheMovementValid(cardsDeal: Deal): void {
        console.debug("Current deal: ", cardsDeal);
        console.debug("Current table: ", this.table);

        if (!cardsDeal.isTheSameType(this.table!)) 
            throw "Invalid movement, not the same deal";

        if (!cardsDeal.isGreaterThan(this.table!))
            throw "Invalid movement, the deal is lower than the table";
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public isSessionStarted(): boolean {
        return this.isStarted;
    }
    
    public getPlayerCardMapping(): Map<Player, Card[]> {
        return this.playerCardMapping;
    }
    
}

export default CapsaSession;