import React from 'react';
import {
    PageTitle, StyledImageBackground, StyledContainer, InnerHomeContainer, LinkButtonContainer, LinkButton, LinkButtonLabel
} from "../styles/components-styles";
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/theme';
import { useNavigation } from '@react-navigation/native';
import { useCredentialsContext } from "../context/user";

export default function HomeScreen() {
    const { isLargeText } = useTheme();
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
                <PageTitle isLargeText={isLargeText}>Welcome {storedCredentials?.decodedName || "Guest"} </PageTitle>
                <LinkButtonContainer>
                    <LinkButton onPress={() => handlePress("question")}>
                        <LinkButtonLabel isLargeText={isLargeText}>Ask your Angel</LinkButtonLabel>
                    </LinkButton>
                </LinkButtonContainer>
                <LinkButtonContainer>
                    <LinkButton onPress={() => handlePress("journals")}>
                        <LinkButtonLabel isLargeText={isLargeText}>Your Questions Journal</LinkButtonLabel>
                    </LinkButton>
                </LinkButtonContainer>
            </InnerHomeContainer>
        </StyledContainer>
    );
}