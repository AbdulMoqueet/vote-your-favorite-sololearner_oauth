import React from 'react';
import googleLogo from "../../resources/google_logo.webp";

const SignInWithGoogle = () => {
    return (
        <div className="sigInWithGoogle">
            <img src={ googleLogo } alt="google logo" />
            Sign in with Goggle
        </div>
    );
}

export default SignInWithGoogle;