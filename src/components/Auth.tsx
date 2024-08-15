import React from 'react';
import { useState, useCallback } from 'react';

interface AuthRowProps {
    setIsAuthorized: (isAuthorized: boolean) => void;
    isAuthorized: boolean;
}

const AuthRow = (props: AuthRowProps) => {
    const { setIsAuthorized, isAuthorized } = props;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const onLogin = useCallback(() => {
        fetch('http://localhost:8000/api-token-auth/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(async (response) => {
            setPassword('');
            if (response.ok) {
                console.log('Login successful');
                const token = (await response.json()).token;
                localStorage.setItem('token', token);
                setIsAuthorized(true);
            } else {
                setLoginError('Login failed');
            }
        })
        .catch(error => {
            console.error('Login failed', error);
        });
    }, [username, password, setIsAuthorized]);

    const onLogout = useCallback(() => {
        localStorage.removeItem('token');
        setIsAuthorized(false);
    }, [setIsAuthorized]);

    return !isAuthorized ?
        (
            <div>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={onLogin} >Login</button>
                <span>{loginError}</span>
            </div>
        ) :
        (
            <div>
                <button onClick={onLogout}>Logout</button>
            </div>
        )
}

export default AuthRow;
