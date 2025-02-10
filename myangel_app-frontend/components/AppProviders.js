import React from 'react';
import { QuestionProvider } from '../context/question';
import { CardProvider } from '../context/card';
import { IsEditProvider } from '../context/isEdit';

const AppProviders = ({ children }) => {
    return (
        <QuestionProvider>
            <CardProvider>
                    <IsEditProvider>
                            {children}
                    </IsEditProvider>
            </CardProvider>
        </QuestionProvider>
    );
};

export default AppProviders;