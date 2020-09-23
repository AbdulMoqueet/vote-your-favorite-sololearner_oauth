import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = props => {

    const [appContext, setAppContext] = useState({
        isLoading: false
    });

    return (
        <AppContext.Provider value={[appContext, setAppContext]}>
            {props.children}
        </AppContext.Provider>
    );

}