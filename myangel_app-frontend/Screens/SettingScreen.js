import React from 'react';
import { Switch } from "react-native";
import {
    MsgBox, Line, StyledLogoutContainer, StyledLogoutButton, SettingContainer, StyledImageBackground, StyledContainer, InnerContainer, SwitchContainer, PageTitle, SubTitle, StyledButton, ButtonText
} from "../styles/components-styles";
import { useTheme } from "../context/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCredentialsContext } from "../context/user";
import { useNavigation } from '@react-navigation/native';


export default function SettingsScreen() {
    const { isLargeText, setIsLargeText } = useTheme();
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
                <PageTitle isLargeText={isLargeText}>Settings</PageTitle>
                <SubTitle isLargeText={isLargeText}>Now you're login as {storedCredentials?.decodedName || "Guest"}</SubTitle>
                <Line />
                <SwitchContainer>
                    <Switch
                        value={isLargeText}
                        onValueChange={async () => {
                            await AsyncStorage.setItem("isLargeText", JSON.stringify(!isLargeText)); // Set only if it's true
                            setIsLargeText(!isLargeText);
                        }}
                        trackColor={{ false: '#faf8d4', true: '#b07bac' }}
                        ios_backgroundColor='#faf8d4'
                    />
                    <SubTitle isLargeText={isLargeText}>   Change to Larger Text</SubTitle>
                </SwitchContainer>
                <StyledLogoutContainer>
                    <StyledLogoutButton onPress={ClearLogin}>
                        <ButtonText isLargeText={isLargeText}>Log out</ButtonText>
                    </StyledLogoutButton>
                </StyledLogoutContainer>
            </SettingContainer>
        </StyledContainer>
    );
}
