import Card from "./components/card/Card";
import gameSectionStyle from './gamesection.module.css';

function GameSection() {
    return (
        <div className={gameSectionStyle.board}>
            <div className={gameSectionStyle.table}>
                <div>
                    <Card frontCard={true} suit={"SPADES"} numberCard={"5"} />
                    <Card suit={"DIAMONDS"} numberCard={"10"} />
                    <Card suit={"HEARTS"} numberCard={"K"} />
                    <Card suit={"CLUBS"} numberCard={"Q"} />
                    <Card suit={"DIAMONDS"} numberCard={"J"} />
                </div>
            </div>
            <div className={gameSectionStyle.hand1}>
                <div>
                    <Card frontCard={true} suit={"SPADES"} numberCard={"5"} />
                    <Card suit={"DIAMONDS"} numberCard={"10"} />
                    <Card suit={"HEARTS"} numberCard={"K"} />
                    <Card suit={"CLUBS"} numberCard={"Q"} />
                    <Card suit={"DIAMONDS"} numberCard={"J"} />
                    <Card suit={"SPADES"} numberCard={"A"} />
                    <Card suit={"DIAMONDS"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
            <div className={gameSectionStyle.hand2}>
                <div>
                    <Card frontCard={true} suit={"SPADES"} numberCard={"5"} />
                    <Card suit={"DIAMONDS"} numberCard={"10"} />
                    <Card suit={"HEARTS"} numberCard={"K"} />
                    <Card suit={"CLUBS"} numberCard={"Q"} />
                    <Card suit={"DIAMONDS"} numberCard={"J"} />
                    <Card suit={"SPADES"} numberCard={"A"} />
                    <Card suit={"DIAMONDS"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
            <div className={gameSectionStyle.hand3}>
                <div>
                    <Card frontCard={true} suit={"SPADES"} numberCard={"5"} />
                    <Card suit={"DIAMONDS"} numberCard={"10"} />
                    <Card suit={"HEARTS"} numberCard={"K"} />
                    <Card suit={"CLUBS"} numberCard={"Q"} />
                    <Card suit={"DIAMONDS"} numberCard={"J"} />
                    <Card suit={"SPADES"} numberCard={"A"} />
                    <Card suit={"DIAMONDS"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
            <div className={gameSectionStyle.hand4}>
                <div>
                    <Card frontCard={true} suit={"SPADES"} numberCard={"5"} />
                    <Card suit={"DIAMONDS"} numberCard={"10"} />
                    <Card suit={"HEARTS"} numberCard={"K"} />
                    <Card suit={"CLUBS"} numberCard={"Q"} />
                    <Card suit={"DIAMONDS"} numberCard={"J"} />
                    <Card suit={"SPADES"} numberCard={"A"} />
                    <Card suit={"DIAMONDS"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                    <Card suit={"SPADES"} numberCard={"2"} />
                </div>
                <div>
                    <p>username</p>
                    <div><p>time</p></div>
                </div>
            </div>
        </div>
    )
}

export default GameSection;