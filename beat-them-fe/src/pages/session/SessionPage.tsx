import io, { Socket } from 'socket.io-client';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import WaitingRoomSection from './WaitingRoomSection';
import GameSection from './GameSection';

function SessionPage() {

    const socket: Socket = io('http://localhost:5000');
    const navigate = useNavigate();
    const { sessionId } = useParams();

    const [isGameStarted, setIsGameStarted] = useState(false);
    const [isSessionFound, setIsSessionFound] = useState(false);

    useEffect(() => {
        socket.emit('look_for_session', sessionId);

        socket.on('session_not_found', () => {
            navigate('/notfound', { replace: true });
        });

        socket.on('session_found', () => {
            setIsSessionFound(true);
        });

        socket.on('game_started', (sessionId: string) => {
            setIsGameStarted(true);
        });

    }, [socket]);

    return (
        <div>
            {(!isGameStarted && isSessionFound) ? <WaitingRoomSection sessionId={sessionId!} socket={socket}/> : ''}
            {isGameStarted ? <GameSection /> : ''}
        </div>
    )
}

export default SessionPage;