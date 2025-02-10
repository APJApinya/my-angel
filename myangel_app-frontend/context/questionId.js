import React, { createContext, useState, useContext } from 'react';

export const QuestionIdContext = createContext();

export const useQuestionIdContext = () => useContext(QuestionIdContext);

export const QuestionIdProvider = ({children}) => {
    const [questionId, setQuestionId] = useState();

    return (
        <QuestionIdContext.Provider value={{questionId, setQuestionId}}>
            {children}
        </QuestionIdContext.Provider>
    )
}