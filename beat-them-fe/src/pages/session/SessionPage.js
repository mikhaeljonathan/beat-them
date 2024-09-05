"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const WaitingRoomSection_1 = require("./WaitingRoomSection");
const GameSection_1 = require("./GameSection");
function SessionPage() {
    const socket = (0, socket_io_client_1.default)('http://localhost:5000');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { sessionId } = (0, react_router_dom_1.useParams)();
    const [isGameStarted, setIsGameStarted] = (0, react_1.useState)(true);
    const [isSessionFound, setIsSessionFound] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        socket.emit('look_for_session', sessionId);
        socket.on('session_not_found', () => {
            navigate('/notfound', { replace: true });
        });
        socket.on('session_found', () => {
            setIsSessionFound(true);
        });
        socket.on('game_started', (returnedSessionId) => {
            if (returnedSessionId !== sessionId)
                return;
            setIsGameStarted(true);
        });
    }, [socket]);
    return (<div>
            {(!isGameStarted && isSessionFound) ? <WaitingRoomSection_1.default sessionId={sessionId} socket={socket}/> : ''}
            {isGameStarted ? <GameSection_1.default /> : ''}
        </div>);
}
exports.default = SessionPage;
