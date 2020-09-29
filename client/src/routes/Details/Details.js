import React, { useContext, useEffect, useState } from 'react';
import VotedByList from "../../components/list/VoteByList";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import Footer from "../../components/footer/Footer";

const Details = (props) => {

    const [appContext, setAppContext] = useContext(AppContext);
    const [votedBy, setVotedBy] = useState([]);
    const [coderName, setCoderName] = useState('Loading...');
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        document.body.style.overflow = 'visible';

        setAppContext({
            ...appContext,
            isLoading: true
        });


        axios
            .post("/api/upvotes", { _id: props.match.params._id })
            .then(res => {
                setVotedBy(res.data.votedBy);
                setAppContext({
                    ...appContext,
                    isLoading: false
                });
                setCoderName(res.data.name + "'s votes");
            })
            .catch(err => {
                console.error(err);
                setAppContext({
                    ...appContext,
                    isLoading: false
                });
                setCoderName('Wrong Id');
            })
            .finally(() => {
                setLoading(false);
            });



    }, []);

    return (
        <div className="details">

            <div className="toolbar">
                <Link to='/' className="toolbar__back">
                    <i className="ri-arrow-left-line"></i>
                </Link>
                <div className="toolbar__title">{coderName}</div>
            </div>

            <div className="votes">

                {votedBy.map((voter, index) => <VotedByList
                    key={index}
                    dp={voter.dp}
                    name={voter.name}
                    at={voter.votedAt} />)}

                {votedBy.length === 0 ? <div className="votes__no-votes">
                    {loading ? '' : <React.Fragment> No Votes Yet :/ <br /> Be the first one to vote ^_^ </React.Fragment>}
                </div> : null}

            </div>

            <Footer />

        </div>
    )
}

export default Details;