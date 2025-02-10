import React from 'react';
import { QuestionProvider } from '../context/question';
import { CardProvider } from '../context/card';
import { IsEditProvider } from '../context/isEdit';
import { QuestionIdProvider } from '../context/questionId';

const AppProviders = ({ children }) => {
    return (
        <QuestionProvider>
            <CardProvider>
                    <IsEditProvider>
                        <QuestionIdProvider>
                            {children}
                        </QuestionIdProvider>
                    </IsEditProvider>
            </CardProvider>
        </QuestionProvider>
    );
};

export default AppProviders;