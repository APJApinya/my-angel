import React from 'react';
import {
    MsgBox, Line, StyledLogoutContainer, StyledLogoutButton, SettingContainer, StyledImageBackground, StyledContainer, InnerContainer, SwitchContainer, PageTitle, SubTitle, StyledButton, ButtonText
} from "../styles/components-styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCredentialsContext } from "../context/user";
import { useNavigation } from '@react-navigation/native';


export default function SettingsScreen() {
    const { storedCredentials, setStoredCredentials } = useCredentialsContext();
    const navigation = useNavigation();

    const ClearLogin = () => {
        AsyncStorage.removeItem('angelappCredentials')
            .then(() => {
                setStoredCredentials(null);
                navigation.navigate("Home"); // Navigate to Login screen after logging out
            })
            .catch(error => console.log(error));
    };

    return (
        <StyledContainer>
            <StyledImageBackground
                source={require("../assets/bg-login.png")} />
            <SettingContainer>
                <PageTitle>Settings</PageTitle>
                <SubTitle>Now you're login as {storedCredentials?.decodedName || "Guest"}</SubTitle>
                <Line />

                <StyledLogoutContainer>
                    <StyledLogoutButton onPress={ClearLogin}>
                        <ButtonText>Log out</ButtonText>
                    </StyledLogoutButton>
                </StyledLogoutContainer>
            </SettingContainer>
        </StyledContainer>
    );
}
