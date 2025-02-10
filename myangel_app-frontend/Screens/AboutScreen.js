import React, { useState, useEffect } from 'react';
import {
    StyledImageBackground, StyledContainer, InnerContainer, PageTitle, SubTitle, Line, TextLinkContent,
} from "../styles/components-styles"
import { Text } from "react-native";
import { StatusBar } from 'expo-status-bar';
import licensesJson from "../licenses.json";


export default function AboutScreen() {
    const [uniqueLicenses, setUniqueLicenses] = useState([]);

    useEffect(() => {
        // Extracting license data and converting it to unique values
        const licensesArray = Object.keys(licensesJson).map(key => licensesJson[key].licenses);
        const uniqueLicenses = [...new Set(licensesArray)];
        setUniqueLicenses(uniqueLicenses);
    }, []);

    return (
        <StyledContainer>
            <StatusBar />
            <StyledImageBackground
                source={require("../assets/bg-login.png")} />
            <InnerContainer>
                <PageTitle>About this application</PageTitle>
                <SubTitle>
                    Purpose:
                </SubTitle>
                <TextLinkContent>
                    This application is made from the concept of improve productivity of end-users by elimanating procastination with tarot card tools.
                    Users can ask the question and select the card of choice. The program will generate random card result and save the question and result in user's journal. With this functionality, user can track back the past questions and also be able to edit based on their will. This application applied the knowledge of React Native and REST APIs.
                </TextLinkContent>
                <Line />
                <SubTitle>
                    Licenses:
                </SubTitle>
                <TextLinkContent>
                {uniqueLicenses.map((license, index) => (
                    <Text key={index}>{license} </Text>
                ))}
                </TextLinkContent>
                <SubTitle>
                    Graphics: 
                </SubTitle>
                <TextLinkContent>
                    Provided by Canva and Freepik
                </TextLinkContent>


            </InnerContainer>
        </StyledContainer>
    );
}