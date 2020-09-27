import React, { useContext, useEffect } from 'react';
import googleLogo from "../../resources/google_logo.webp";
import { AppContext } from '../../context/AppContext';
import axios from "axios";

const SignInWithGoogle = () => {

    const [appContext, setAppContext] = useContext(AppContext);

    const onSubmit = () => {
        setAppContext({ ...appContext, isLoading: true })
        if (appContext.isLogin)
            axios
                .get("/api/user/signout")
                .then(res => setAppContext({ ...appContext, isLogin: false, isLoading: false }))
                .catch(err => setAppContext({ ...appContext, isLoading: false }))
        else
            window.location.href = 'http://localhost:5000/auth/google';
    }

    return (
        <div className="sigInWithGoogle" onClick={onSubmit}>
            <img src={googleLogo} alt="google logo" />
            {!appContext.isLogin ? 'Sign in with Goggle' : 'Sign out'}
        </div>
    );
}

export default SignInWithGoogle;