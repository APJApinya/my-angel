import React from 'react';
import { CredentialsProvider } from "./context/user";
import MainApp from './components/MainApp';

export default function App() {
    
    return (
        <CredentialsProvider>
            <MainApp />
        </CredentialsProvider>
    );
}