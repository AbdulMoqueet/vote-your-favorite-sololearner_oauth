import React from 'react';
import List from '../../components/list/List';
import SignInWithGoogle from "../../components/signInWithGoogle/SignInWithGoogle";

const Home = () => {
    return (
        <div className="home">

            <div className="home__side-theme"></div>

            <div className="top mt-3">
                <div className="top__title">Vote Your Fav <span>SoloLearner</span></div>
            </div>

            <div className="list-container">

                <List name="Sick Line" vote="10" />
                <List name="Sick Line" vote="10" />
                <List name="Sick Line" vote="10" />
                <List name="Sick Line" vote="10" />

                <SignInWithGoogle />

            </div>



        </div>
    )
}

export default Home;