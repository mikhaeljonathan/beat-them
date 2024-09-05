"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = require("socket.io-client");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
const home_module_css_1 = require("./home.module.css");
function Home() {
    const socket = (0, socket_io_client_1.default)('http://localhost:5000');
    const navigate = (0, react_router_dom_1.useNavigate)();
    const createSession = () => {
        socket.emit('create_session');
    };
    (0, react_1.useEffect)(() => {
        socket.on('session_created', (sessionId) => {
            console.log('connected with sessionId: ', sessionId);
            navigate(`/${sessionId}`, { replace: true });
        });
    }, [socket]);
    return (<div>
            <h1>Beat-Them</h1>
            <button onClick={createSession} className={home_module_css_1.default.marginButton}>Create session</button>
            <br />
        </div>);
}
exports.default = Home;
