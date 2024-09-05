"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const card_module_css_1 = require("./card.module.css");
function Card(props) {
    let suit = '';
    switch (props.suit) {
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
    const redColor = (suit === '♥' || suit === '♦');
    const [isPicked, setIspicked] = (0, react_1.useState)(false);
    const togglePicked = () => {
        setIspicked(!isPicked);
    };
    return (<div onClick={togglePicked} className={`${card_module_css_1.default.card} 
                ${isPicked ? card_module_css_1.default.picked : card_module_css_1.default.notPicked} 
                ${redColor ? card_module_css_1.default.redColor : ''} 
                ${props.frontCard ? card_module_css_1.default.cardFront : card_module_css_1.default.cardRear}`}>

            <p className={`${props.frontCard ? card_module_css_1.default.topLeft : card_module_css_1.default.topMiddle}`}>{suit}</p>
            <p className={card_module_css_1.default.number}>{props.numberCard}</p>
            {props.frontCard ? <p className={card_module_css_1.default.bottomRight}>{suit}</p> : ''}
        </div>);
}
exports.default = Card;
