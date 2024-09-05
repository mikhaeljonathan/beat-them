"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Card_1 = require("./components/card/Card");
const gamesection_module_css_1 = require("./gamesection.module.css");
function GameSection() {
    return (<div className={gamesection_module_css_1.default.board}>
            <div className={gamesection_module_css_1.default.table}>
                <div>
                    <Card_1.default frontCard={true} suit={"SPADES"} numberCard={"5"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"10"}/>
                    <Card_1.default suit={"HEARTS"} numberCard={"K"}/>
                    <Card_1.default suit={"CLUBS"} numberCard={"Q"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"J"}/>
                </div>
            </div>
            <div className={gamesection_module_css_1.default.hand1}>
                <div>
                    <Card_1.default frontCard={true} suit={"SPADES"} numberCard={"5"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"10"}/>
                    <Card_1.default suit={"HEARTS"} numberCard={"K"}/>
                    <Card_1.default suit={"CLUBS"} numberCard={"Q"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"J"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"A"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
            <div className={gamesection_module_css_1.default.hand2}>
                <div>
                    <Card_1.default frontCard={true} suit={"SPADES"} numberCard={"5"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"10"}/>
                    <Card_1.default suit={"HEARTS"} numberCard={"K"}/>
                    <Card_1.default suit={"CLUBS"} numberCard={"Q"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"J"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"A"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
            <div className={gamesection_module_css_1.default.hand3}>
                <div>
                    <Card_1.default frontCard={true} suit={"SPADES"} numberCard={"5"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"10"}/>
                    <Card_1.default suit={"HEARTS"} numberCard={"K"}/>
                    <Card_1.default suit={"CLUBS"} numberCard={"Q"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"J"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"A"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
            <div className={gamesection_module_css_1.default.hand4}>
                <div>
                    <Card_1.default frontCard={true} suit={"SPADES"} numberCard={"5"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"10"}/>
                    <Card_1.default suit={"HEARTS"} numberCard={"K"}/>
                    <Card_1.default suit={"CLUBS"} numberCard={"Q"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"J"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"A"}/>
                    <Card_1.default suit={"DIAMONDS"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                    <Card_1.default suit={"SPADES"} numberCard={"2"}/>
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
        </div>);
}
exports.default = GameSection;
