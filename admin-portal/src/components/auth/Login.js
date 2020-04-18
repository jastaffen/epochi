import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import FormField from '../forms/FormField';

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ pw, setPw ] = useState('');
    const [ confPw, setconfPw ] = useState('');
    let history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !pw || !confPw) 
            return alert("fields are empty");
        if (pw !== confPw) 
            return alert("Passwords do not match");

        const config = {
            headers: {
                'Content-Type': "application/json"
            }
        }
        const body = JSON.stringify({ username, pw });

        try {
            const res = await axios
                .post("http://localhost:5400/api/auth/login", body, config);
            
            const { isAuthenticated, token } = res.data;
            if (isAuthenticated && token) {
                localStorage.setItem('token', token);
                return history.push('/dashboard');
            } else {
                alert(res.data.msg);
            }

            
        } catch (err) {
            alert(err.message);
        }
    }

    return(
        <>
            <main>
                <h1>Welcome to Epochi admin portal</h1>
                <h3>Please Login</h3>
           
                <form onSubmit={handleSubmit}>

                    <FormField type="text" name="username" 
                        value={username} 
                        handleChange={(e) => setUsername(e.target.value)} 
                    />
            
                    <FormField type="password" name="password" 
                        value={pw} 
                        handleChange={(e) => setPw(e.target.value)} 
                    />

                    <FormField type="password" name="confirm password"
                        value={confPw} 
                            handleChange={(e) => setconfPw(e.target.value)}
                    />

                    <FormField type="submit" name="submit" />
                </form>
            </main>
        </>
    )
}

export default Login;