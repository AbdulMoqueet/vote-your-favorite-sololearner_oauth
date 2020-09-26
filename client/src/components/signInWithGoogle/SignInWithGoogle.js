import React from 'react';
import googleLogo from "../../resources/google_logo.webp";

const SignInWithGoogle = () => {

    const onSubmit = () =>{
        window.location.href = 'http://localhost:5000/auth/google';
    }

    return (
        <div className="sigInWithGoogle" onClick={onSubmit}>
            <img src={ googleLogo } alt="google logo" />
            Sign in with Goggle
        </div>
    );
}

export default SignInWithGoogle;