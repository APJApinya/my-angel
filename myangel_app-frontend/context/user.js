import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

// create the context
export const CredentialsContext = createContext();
// provide a custom hook for accessing the context
export const useCredentialsContext = () => useContext(CredentialsContext);

// wrapper if we want to use this context
export const CredentialsProvider = ({ children }) => {
    const [storedCredentials, setStoredCredentials] = useState(null);

    // Retrieves Stored Credentials from AsyncStorage
    useEffect(()=>{
        const checkStoredCredentials = async () => {
            try {
                const result = await AsyncStorage.getItem('angelappCredentials');
                if (result){
                    // need to pass as JSON as we have credentials as the object here
                    setStoredCredentials(JSON.parse(result));
                }
            } catch (error){
                console.log("Error loading stored credentials:", error);
            }
        };
        checkStoredCredentials();
    }, 
    // recheck when storedCredentials change
    [storedCredentials]);

    return (
        <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}>
            {children}
        </CredentialsContext.Provider>
    );
};