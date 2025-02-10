import React from 'react';
import { ThemeProvider } from "../context/theme";
import { QuestionProvider } from '../context/question';
import { CardProvider } from '../context/card';
import { IsEditProvider } from '../context/isEdit';
import { QuestionIdProvider } from '../context/questionId';

const AppProviders = ({ children }) => {
    return (
        <QuestionProvider>
            <CardProvider>
                <ThemeProvider>
                    <IsEditProvider>
                        <QuestionIdProvider>
                            {children}
                        </QuestionIdProvider>
                    </IsEditProvider>
                </ThemeProvider>
            </CardProvider>
        </QuestionProvider>
    );
};

export default AppProviders;