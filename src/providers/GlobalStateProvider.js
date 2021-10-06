import React, { useState } from 'react';

const GlobalStateContext = React.createContext();

const GlobalStateProvider = (props) => {
    const [favorites, setFavorites] = useState([]);

    return (
        <GlobalStateContext.Provider value={{ favorites, setFavorites }}>
            {props.children}
        </GlobalStateContext.Provider>
    )
}


const useGlobalState = () => {
    const context = React.useContext(GlobalStateContext);

    if (context === undefined) {
        throw new Error('useGlobalState must be used within a Provider');
    }

    return context;
}

export { GlobalStateProvider, useGlobalState };