import React, { createContext, useState, useContext } from 'react';

export const QuestionContext = createContext();

export const useQuestionContext = () => useContext(QuestionContext);

export const QuestionProvider = ({children}) => {
    const [question, setQuestion] = useState('');
    
    return (
        <QuestionContext.Provider value={{question, setQuestion}}>
            {children}
        </QuestionContext.Provider>
    )
}