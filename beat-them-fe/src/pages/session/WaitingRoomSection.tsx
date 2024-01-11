import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import sessionPageStyle from './sessionPage.module.css';
import Cookies from 'js-cookie';

interface WaitingRoomSectionProps {
    sessionId: string;
    socket: Socket;
}

function WaitingRoomSection(props: WaitingRoomSectionProps) {

    const socket = props.socket;
    const fullURL = 'http://' + window.location.hostname + ':' + window.location.port + '/' + props.sessionId;
    const usernameTextField = useRef<HTMLInputElement>(null);

    const [players, setPlayers] = useState<string[]>([]);
    const [username, setUsername] = useState<string>(Cookies.get('username') ?? '');
    const [isUsernamePicked, setIsUsernamePicked] = useState(false);
    const [isUsernameTaken, setIsUsernameTaken] = useState(false);
    const [isEligibleToJoin, setIsEligibleToJoin] = useState(false);
    const [isEligibleToStartGame, setIsEligibleToStartGame] = useState(false);

    const joinSession = () => {
        socket.emit('join_session', username, props.sessionId);
    }

    const startGame = () => {
        socket.emit('start_game', props.sessionId);
    }

    const pickUsername = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault();
        const inputtedUsername: string = usernameTextField.current?.value ?? '';

        if (inputtedUsername === '') return;

        setUsername(inputtedUsername);
        console.log('username: ', username);
        Cookies.set('username', inputtedUsername);
        setIsUsernamePicked(true);
    }
    
    useEffect(() => {
        if (username === '' || username === undefined || username === null) {
            setIsUsernamePicked(false);
        } else {
            setIsUsernamePicked(true);
            usernameTextField.current!.value = username;
        }

        socket.emit('fetch_players', props.sessionId);

        socket.on('players_fetched', (sessionId, players: string[]) => {
            if (sessionId !== props.sessionId) return;

            setPlayers(players);

            console.log(players, username)

            if (players.includes(username) || players.length == Number(4)) {
                setIsEligibleToJoin(false);
            } else {
                setIsEligibleToJoin(true);
            }
        });

        socket.on('username_taken', () => {
            setIsUsernameTaken(true);
        });

        socket.on('session_joined', (sessionId: string) => {
            if (sessionId !== props.sessionId) return;
            socket.emit('fetch_players', sessionId);
        });

        socket.on('eligible_to_start', () => {
            setIsEligibleToStartGame(true);
        });

    }, [socket, username]);

    return (
        <div>
            <div className={sessionPageStyle.topright}>
                <input disabled={isUsernamePicked ? true : false} type="text" placeholder='Username' className={sessionPageStyle.inputUsername} ref={usernameTextField}/>
                {isUsernamePicked ? '' : <button onClick={pickUsername}>Set username</button>}
                <p className={`${sessionPageStyle.errormsg} ${isUsernameTaken ? sessionPageStyle.visible : sessionPageStyle.invisible}`}>username is already taken</p>
            </div>

            <h2>Use this link to join</h2>
            <a href={fullURL}>{fullURL}</a>
            <h2>Players</h2>
            {players.map((player: string, index: number) => {
                return <h3 key={player}>{index + 1}. {player}</h3>
            })}

            {isEligibleToJoin ? <button onClick={joinSession}>Join the session</button> : ''}
            {isEligibleToStartGame ? <button onClick={startGame}>Start Game</button> : ''}
            <p className={`${sessionPageStyle.errormsg} ${isUsernamePicked ? sessionPageStyle.invisible : sessionPageStyle.visible}`}>Input your username</p>
        </div>
    )
}

export default WaitingRoomSection;