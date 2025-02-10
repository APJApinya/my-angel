import React, { createContext, useState, useContext } from 'react';

export const IsEditContext = createContext();

export const useIsEditContext = () => useContext(IsEditContext);

export const IsEditProvider = ({children}) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <IsEditContext.Provider value={{isEdit, setIsEdit}}>
            {children}
        </IsEditContext.Provider>
    )
}