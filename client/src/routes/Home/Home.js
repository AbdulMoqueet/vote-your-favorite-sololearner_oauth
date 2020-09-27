import React, { useEffect, useState, useContext } from 'react';
import List from '../../components/list/List';
import SignInWithGoogle from "../../components/signInWithGoogle/SignInWithGoogle";
import axios from "axios";
import ConfirmPopup from "../../components/popup/ConfirmPopup";
import AlertPopup from "../../components/popup/AlertPopup";
import { AppContext } from "../../context/AppContext";

import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import defaultUserDp from "../../resources/default_user.png";

let selectedIndex = 0;

const Home = () => {

    const [appContext, setAppContext] = useContext(AppContext);

    const [contestants, setContestants] = useState([]);
    const [confirmPopup, setConfirmPopup] = useState({
        isOpen: false,
        coder: ''
    });

    const [alertPopup, setAlertPopup] = useState({
        isOpen: false,
        title: '',
        msg: '',
        scroll: false
    });

    const closeAlertPopup = () => {
        document.body.style.overflow = 'visible';
        setAlertPopup({
            ...alertPopup,
            isOpen: false
        });

        if (alertPopup.scroll)
            animateScroll.scrollToBottom();

    }

    const closePopup = () => {
        document.body.style.overflow = 'visible';
        setConfirmPopup({
            ...confirmPopup,
            isOpen: false
        });
    }

    useEffect(() => {
        updateList();
    }, []);

    const listSelected = (e) => {

        document.body.style.overflow = 'hidden';

        if (!appContext.isLogin) {
            setAlertPopup({
                isOpen: true,
                title: 'You are not login',
                msg: "Sorry unauthorized user can't vote. Sign in with google to vote",
                scroll: true
            });
            return;
        }


        const coderName = e.currentTarget.children[1].children[0].textContent;

        selectedIndex = contestants.findIndex(coder => coder.name === coderName);
        const coder = contestants[selectedIndex];

        setConfirmPopup({
            isOpen: true,
            coder
        });
    }

    const updateList = () => {
        axios
            .get("/api/contestants")
            .then(res => setContestants(res.data.contestants))
            .catch(err => console.error(err));
    }

    const submitVote = (_id) => {
        closePopup();

        setAppContext({
            ...appContext,
            isLoading: true
        });

        axios
            .post("/api/vote", { _id })
            .then((res) => {

                setContestants(res.data.contestants);

                toast.success(`Voted for: ${confirmPopup.coder.name} done`);

            })
            .catch(err => {
                setAlertPopup({
                    isOpen: true,
                    title: 'You have voted already',
                    msg: `You have voted already for: ${err.response.data.votedFor} \n\n You can only vote once.`,
                    scroll: false
                });
            })
            .finally(() => {
                setAppContext({
                    ...appContext,
                    isLoading: false
                });
            });

    }

    return (
        <div className="home">

            { confirmPopup.isOpen && <ConfirmPopup  {...confirmPopup} closePopup={closePopup} submitVote={submitVote} />}

            { alertPopup.isOpen && <AlertPopup
                hide={closeAlertPopup}
                title={alertPopup.title}
                msg={alertPopup.msg}
                scroll={alertPopup.scroll}
            />}



            <div className="container">

                <div className="home__side-theme"></div>

                <div className="top mt-3">

                    <div className="top-login">
                        <div className="top-login__title">Vote Your Fav <span>SoloLearner</span></div>

                        <div className="top-login__profile" onClick={animateScroll.scrollToBottom}>
                            <img src={appContext.isLogin ? appContext.user.dp : defaultUserDp}
                                alt="user_dp" />
                        </div>

                    </div>

                </div>

                <div className="list-container">

                    {contestants.map(contestant => {
                        return <List
                            key={contestant._id}
                            name={contestant.name}
                            vote={contestant.votes}
                            soloId={contestant.soloId}
                            click={listSelected}
                        />;
                    })}

                    <SignInWithGoogle />

                </div>


            </div>
        </div>
    )
}

export default Home;