import React, { useEffect, useState } from 'react';
import List from '../../components/list/List';
import SignInWithGoogle from "../../components/signInWithGoogle/SignInWithGoogle";
import axios from "axios";

const Home = () => {

    const [contestants, setContestants] = useState([]);

    useEffect(() => {

        axios
          .get("api/contestants")
          .then(res => {
              console.log(res.data.contestants);
              setContestants(res.data.contestants);
          })
          .catch(err => console.error(err));

    }, []);
    


    return (
        <div className="home">

        <div className="container">

            <div className="home__side-theme"></div>

            <div className="top mt-3">
                <div className="top__title">Vote Your Fav <span>SoloLearner</span></div>
            </div>

            <div className="list-container">

            {contestants.map(contestant => {
                return <List 
                key={contestant._id}
                name={contestant.name} 
                vote={contestant.votes}
                soloId={contestant.soloId}    
                />;
            })}

                <SignInWithGoogle />

            </div>


</div>
        </div>
    )
}

export default Home;