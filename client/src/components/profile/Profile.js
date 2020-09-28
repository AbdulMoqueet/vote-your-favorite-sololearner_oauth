import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from "axios";

const Profile = ({ close }) => {

  const [appContext, setAppContext] = useContext(AppContext);

  const logOut = (e) => {

    setAppContext({ ...appContext, isLoading: true });

    axios
      .get("/api/user/signout")
      .then(() => {
        setAppContext({ ...appContext, isLogin: false, isLoading: false })
      })
      .catch(err => setAppContext({ ...appContext, isLoading: false }))
  }


  return (
    <div className="profile" onClick={close}>

      <div className="profile__box">

        <div className="profile__dp">

          <div className="profile__wrapper">
            <img src={appContext.user.dp} alt="profile dp" />
            <div className="profile__name">{appContext.user.name}</div>
          </div>

          <div className="profile__email">{appContext.user.email}</div>
        </div>

        <div className="profile__list__wrapper">
          <div className="profile__list">Voted For: {appContext.user.votedFor ? appContext.user.votedFor : 'Not Voted Yet'}</div>
          <div className="profile__list logout" onClick={logOut}>
            <i className="ri-logout-box-line logout-icn"></i>
            <span>Logout</span>
          </div>
        </div>

      </div>



    </div>
  )
}

export default Profile;