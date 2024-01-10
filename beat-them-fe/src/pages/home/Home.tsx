import io, { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import homeStyle from './home.module.css';
import Cookies from 'js-cookie';

function Home() {

    const socket: Socket = io('http://localhost:5000');
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [sessionId, setSessionId] = useState('');
    const [isUsernameFilled, setIsUsernameFilled] = useState(true);
    const [isSessionIdFilled, setIsSessionIdFilled] = useState(true);
    const [isSessionIdValid, setIsSessionIdValid] = useState(true);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);

    const resetAllStates = () => {
        setIsUsernameFilled(true);
        setIsSessionIdFilled(true);
        setIsSessionIdValid(true);
        setIsUsernameTaken(false);
    }

    const createSession = () => {
        resetAllStates();
        if (username === '') {
            setIsUsernameFilled(false);
            return;
        }
        socket.emit('create_session', username);
    }

    const joinSession = () => {
        resetAllStates();
        if (sessionId === '') {
            setIsSessionIdFilled(false);
            return;
        }
        if (username === '') {
            setIsUsernameFilled(false);
            return;
        }
        socket.emit('join_session', username, sessionId);
    }

    const pickUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsUsernameFilled(true);    
        setUsername(event.target.value);
    }

    const pickSessionId = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsSessionIdFilled(true);
        setSessionId(event.target.value);
    }
    
    useEffect(() => {
        socket.on('session_created', (sessionId: string) => {
            console.log('connected with sessionId: ', sessionId);
            Cookies.set('username', username);
            navigate(`/${sessionId}`, { replace: true } );
        });

        socket.on('session_joined', (sessionId: string) => {
            console.log('connected with sessionId: ', sessionId);
            Cookies.set('username', username);
            navigate(`/${sessionId}`, { replace: true } );
        });

        socket.on('username_taken', () => {
            setIsUsernameTaken(true);
        });

        socket.on('username_required', () => {
            setIsUsernameFilled(false);
        });

        socket.on('session_not_found', () => {
            setIsSessionIdValid(false);
        });
    }, [socket]);

    return (
        <div>
            <h1>Beat-Them</h1>

            <div className={homeStyle.topright}>
                <input type="text" placeholder='Username' className={homeStyle.inputUsername} 
                    value={username} onChange={pickUsername}/>
                <p className={`${homeStyle.errormsg} ${isUsernameTaken ? homeStyle.visible : homeStyle.invisible}`}>username is already taken</p>
            </div>
            <button onClick={createSession} className={homeStyle.marginButton}>Create session</button>

            <br />

            <input type="text" placeholder="Session ID" className={homeStyle.inputSession} 
                value={sessionId} onChange={pickSessionId}/>
            <button onClick={joinSession} className={homeStyle.marginButton}>Join session</button>
            <p className={`${homeStyle.errormsg} ${isUsernameFilled ? homeStyle.invisible : homeStyle.visible}`}>Input your username</p>
            <p className={`${homeStyle.errormsg} ${isSessionIdFilled ? homeStyle.invisible : homeStyle.visible}`}>Input your session ID</p>
            <p className={`${homeStyle.errormsg} ${isSessionIdValid ? homeStyle.invisible : homeStyle.visible}`}>session ID doesn't exist</p>

        </div>
    );
}

export default Home;