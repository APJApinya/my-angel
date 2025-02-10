import React, { createContext, useState, useContext } from 'react';

export const CardContext = createContext();

export const useCardContext = () => useContext(CardContext);

export const CardProvider = ({children}) => {
    const [card, setCard] = useState('');
    
    return (
        <CardContext.Provider value={{card, setCard}}>
            {children}
        </CardContext.Provider>
    )
}