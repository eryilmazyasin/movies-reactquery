import React, { useState, useRef, useEffect } from 'react';
const GlobalStateContext = React.createContext();

const GlobalStateProvider = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
        

    return (
        <GlobalStateContext.Provider value={{
            isModalOpen, setIsModalOpen
        }} {...props}>
            {props.children}
        </GlobalStateContext.Provider>
    );
};

const useGlobalState = () => {
    const context = React.useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error('useGlobalState must be used within a Provider');
    }

    return context;
};

export { GlobalStateProvider, useGlobalState };
