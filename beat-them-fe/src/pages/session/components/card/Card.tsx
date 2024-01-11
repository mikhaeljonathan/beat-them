import { useState } from 'react';
import cardStyle from './card.module.css';

interface CardProps {
    suit: string,
    numberCard: string
    frontCard?: boolean
}

function Card(props: CardProps) {

    let suit: string = '';

    switch(props.suit) {
        case 'SPADES':
            suit = '♠';
            break;
        case 'HEARTS':
            suit = '♥';
            break;
        case 'CLUBS':
            suit = '♣';
            break;
        case 'DIAMONDS':
            suit = '♦';
            break;
    }

    const redColor = (suit === '♥' || suit === '♦')

    const [isPicked, setIspicked] = useState(false);

    const togglePicked = () => {
        setIspicked(!isPicked);
    }

    return (
        <div onClick={togglePicked} 
            className={`${cardStyle.card} 
                ${isPicked ? cardStyle.picked : cardStyle.notPicked} 
                ${redColor ? cardStyle.redColor : ''} 
                ${props.frontCard ? cardStyle.cardFront: cardStyle.cardRear}`}>

            <p className={`${props.frontCard ? cardStyle.topLeft : cardStyle.topMiddle}`}>{suit}</p>
            <p className={cardStyle.number}>{props.numberCard}</p>
            {props.frontCard ? <p className={cardStyle.bottomRight}>{suit}</p> : ''}
        </div>
    )
}

export default Card;