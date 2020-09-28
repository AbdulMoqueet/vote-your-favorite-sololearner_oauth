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
import Profile from '../../components/profile/Profile';

let selectedIndex = 0;

const Home = () => {

    const [appContext, setAppContext] = useContext(AppContext);
    const [contestant, setContestant] = useState([]);
    const [profile, setProfile] = useState(false);

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

    const profileHandler = () => {

        if (!appContext.isLogin) {
            animateScroll.scrollToBottom();
            return;
        }

        setProfile(true);
    }

    const closeProfile = (e) => {
        if (e.target.className === 'profile' || e.target.className === 'profile__list logout')
            setProfile(false);
    }

    useEffect(() => {
        updateList();
    }, []);

    const listSelected = (e) => {

        if (e.target.className === 'ri-arrow-right-s-line')
            return;

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

        selectedIndex = contestant.findIndex(coder => coder.name === coderName);
        const coder = contestant[selectedIndex];

        setConfirmPopup({
            isOpen: true,
            coder
        });
    }

    const updateList = () => {
        axios
            .get("/api/contestants")
            .then(res => setContestant(res.data.contestants))
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
                setContestant(res.data.contestants);
                setAppContext({
                    ...appContext,
                    isLoading: false,
                    user: res.data.user
                })

                toast.success(`Voted for: ${confirmPopup.coder.name} done`);

            })
            .catch(err => {
                setAppContext({
                    ...appContext,
                    isLoading: false
                });
                setAlertPopup({
                    isOpen: true,
                    title: 'You have voted already',
                    msg: `You have voted already for: '${err.response.data.votedFor}' You can only vote once.`,
                    scroll: false
                });
            });

    }

    return (
        <div className="home">

            { confirmPopup.isOpen && <ConfirmPopup
                {...confirmPopup}
                closePopup={closePopup}
                submitVote={submitVote} />}

            { alertPopup.isOpen && <AlertPopup
                hide={closeAlertPopup}
                title={alertPopup.title}
                msg={alertPopup.msg}
                scroll={alertPopup.scroll}
            />}

            {profile && <Profile close={closeProfile} />}

            <div className="container">

                <div className="home__side-theme"></div>

                <div className="top mt-3">

                    <div className="top-login">
                        <div className="top-login__title">Vote Your Fav <span>SoloLearner</span></div>

                        <div className="top-login__profile" onClick={profileHandler}>
                            <img src={appContext.isLogin ? appContext.user.dp : defaultUserDp}
                                alt="user_dp" />
                        </div>

                    </div>

                </div>

                <div className="list-container">

                    <div className="sort">Sort by: ( Most Votes | Alphabet )</div>

                    {contestant.map(contestant => {
                        return <List
                            key={contestant._id}
                            click={listSelected}
                            coder={contestant}
                        />;
                    })}

                    {contestant.length !== 0 ? <SignInWithGoogle /> : null}


                </div>


            </div>
        </div>
    )
}

export default Home;