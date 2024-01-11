import io, { Socket } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import homeStyle from './home.module.css';

function Home() {

    const socket: Socket = io('http://localhost:5000');
    const navigate = useNavigate();

    const createSession = () => {
        socket.emit('create_session');
    }
    
    useEffect(() => {
        socket.on('session_created', (sessionId: string) => {
            console.log('connected with sessionId: ', sessionId);
            navigate(`/${sessionId}`, { replace: true } );
        });
    }, [socket]);

    return (
        <div>
            <h1>Beat-Them</h1>
            <button onClick={createSession} className={homeStyle.marginButton}>Create session</button>
            <br />
        </div>
    );
}

export default Home;