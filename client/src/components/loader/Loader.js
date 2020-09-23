import React, { useContext } from "react";
import { AppContext } from '../../context/AppContext';


const Loader = () => {

    const [appContext] = useContext(AppContext);

    return (
        appContext.isLoading &&
        <div className="loader-container">
            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}

export default Loader;