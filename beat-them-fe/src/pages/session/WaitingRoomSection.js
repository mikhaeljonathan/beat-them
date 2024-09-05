"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const sessionPage_module_css_1 = require("./sessionPage.module.css");
const js_cookie_1 = require("js-cookie");
function WaitingRoomSection(props) {
    var _a;
    const socket = props.socket;
    const fullURL = 'http://' + window.location.hostname + ':' + window.location.port + '/' + props.sessionId;
    const usernameTextField = (0, react_1.useRef)(null);
    const [players, setPlayers] = (0, react_1.useState)([]);
    const [username, setUsername] = (0, react_1.useState)((_a = js_cookie_1.default.get('username')) !== null && _a !== void 0 ? _a : '');
    const [isUsernamePicked, setIsUsernamePicked] = (0, react_1.useState)(false);
    const [isUsernameTaken, setIsUsernameTaken] = (0, react_1.useState)(false);
    const [isEligibleToJoin, setIsEligibleToJoin] = (0, react_1.useState)(false);
    const [isEligibleToStartGame, setIsEligibleToStartGame] = (0, react_1.useState)(false);
    const joinSession = () => {
        socket.emit('join_session', username, props.sessionId);
    };
    const startGame = () => {
        socket.emit('start_game', props.sessionId);
    };
    const pickUsername = (event) => {
        var _a, _b;
        event.preventDefault();
        const inputtedUsername = (_b = (_a = usernameTextField.current) === null || _a === void 0 ? void 0 : _a.value) !== null && _b !== void 0 ? _b : '';
        if (inputtedUsername === '')
            return;
        setUsername(inputtedUsername);
        console.log('username: ', username);
        js_cookie_1.default.set('username', inputtedUsername);
        setIsUsernamePicked(true);
    };
    (0, react_1.useEffect)(() => {
        if (username === '' || username === undefined || username === null) {
            setIsUsernamePicked(false);
        }
        else {
            setIsUsernamePicked(true);
            usernameTextField.current.value = username;
        }
        socket.emit('fetch_players', props.sessionId);
        socket.on('players_fetched', (sessionId, players) => {
            if (sessionId !== props.sessionId)
                return;
            setPlayers(players);
            console.log(players, username);
            if (players.includes(username) || players.length == Number(4)) {
                setIsEligibleToJoin(false);
            }
            else {
                setIsEligibleToJoin(true);
            }
        });
        socket.on('username_taken', () => {
            setIsUsernameTaken(true);
        });
        socket.on('session_joined', (sessionId) => {
            if (sessionId !== props.sessionId)
                return;
            socket.emit('fetch_players', sessionId);
        });
        socket.on('eligible_to_start', () => {
            setIsEligibleToStartGame(true);
        });
    }, [socket, username]);
    return (<div>
            <div className={sessionPage_module_css_1.default.topright}>
                <input disabled={isUsernamePicked ? true : false} type="text" placeholder='Username' className={sessionPage_module_css_1.default.inputUsername} ref={usernameTextField}/>
                {isUsernamePicked ? '' : <button onClick={pickUsername}>Set username</button>}
                <p className={`${sessionPage_module_css_1.default.errormsg} ${isUsernameTaken ? sessionPage_module_css_1.default.visible : sessionPage_module_css_1.default.invisible}`}>username is already taken</p>
            </div>

            <h2>Use this link to join</h2>
            <a href={fullURL}>{fullURL}</a>
            <h2>Players</h2>
            {players.map((player, index) => {
            return <h3 key={player}>{index + 1}. {player}</h3>;
        })}

            {isEligibleToJoin ? <button onClick={joinSession}>Join the session</button> : ''}
            {isEligibleToStartGame ? <button onClick={startGame}>Start Game</button> : ''}
            <p className={`${sessionPage_module_css_1.default.errormsg} ${isUsernamePicked ? sessionPage_module_css_1.default.invisible : sessionPage_module_css_1.default.visible}`}>Input your username</p>
        </div>);
}
exports.default = WaitingRoomSection;
