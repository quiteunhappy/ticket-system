import axios from 'axios';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { useHistory } from 'react-router';

export default function LogIn() {
    const responseGoogle = (response) => {
        console.log(JSON.stringify(response));
        axios.post('https://localhost:44328/VerifyGoogleLogin', JSON.stringify(response), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((reply) => {
                window.sessionStorage.setItem("token", reply.data);
            });
        console.log("redirect");
        window.location.reload(false);
    }

    return (
        <GoogleLogin
            clientId="330743551955-ku1gq6qkt65heqbro4d0brc0ns13vpt1.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
        />

    );
}