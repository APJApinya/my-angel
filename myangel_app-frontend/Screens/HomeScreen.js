import React from 'react';
import {
    PageTitle, StyledImageBackground, StyledContainer, InnerHomeContainer, LinkButtonContainer, LinkButton, LinkButtonLabel
} from "../styles/components-styles";
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useCredentialsContext } from "../context/user";

export default function HomeScreen() {
    const navigation = useNavigation();
    const { storedCredentials } = useCredentialsContext();

    const handlePress = (label) => {
        if (label === "question") {
            navigation.navigate("AskQuestion");
        } else if (label === "journals") {
            navigation.navigate("Journals");
        }
    };

    return (
        <StyledContainer>
            <StatusBar />
            <StyledImageBackground
                source={require("../assets/home.png")} />
            <InnerHomeContainer>
                <PageTitle>Welcome {storedCredentials?.decodedName || "Guest"} </PageTitle>
                <LinkButtonContainer>
                    <LinkButton onPress={() => handlePress("question")}>
                        <LinkButtonLabel>Ask your Angel</LinkButtonLabel>
                    </LinkButton>
                </LinkButtonContainer>
                <LinkButtonContainer>
                    <LinkButton onPress={() => handlePress("journals")}>
                        <LinkButtonLabel>Your Questions Journal</LinkButtonLabel>
                    </LinkButton>
                </LinkButtonContainer>
            </InnerHomeContainer>
        </StyledContainer>
    );
}