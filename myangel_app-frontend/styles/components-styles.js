import styled from 'styled-components';
import { SafeAreaView, ScrollView, ImageBackground, View, Text, Image, Switch, FlatList, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView } from 'react-native';
import Constants from 'expo-constants';

//getting the height
const StatusBarHeight = Constants.statusBarHeight;

//colors
export const Colors = {
    primary: "#004e89",
    secondary: "#faf8d4",
    tertiary: "#000000",
    darkLight: "#9CA3AF",
    brand: "#b07bac",
};

const { primary, secondary, tertiary, darkLight, brand } = Colors;


export const StyledContainer = styled.SafeAreaView`
    flex: 1;
    justify-content: center;
    alignItems: center;
`;

export const InnerContainer = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;

`;

export const JournalsContainer = styled.View`
    margin-top: 40%;
    flex: 1;
    width: 100%;
    align-items: center;
    justify-content: center;

`;

export const SettingContainer = styled.View`
    width: 100%;
    height: 55%;
    align-items: center;
`;


export const CardPickContainer = styled.View`
    flex: 1;
    width: 100%;
    justify-content: center;
    margin-top: 370px;


`;

export const InnerCardContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    padding: 10px;

`;

export const PageLogo = styled.Image`
    width: 250px;
    height: 200px
`;

export const PageTitle = styled.Text`
    font-size: ${({ isLargeText }) => (isLargeText ? '40px' : '35px')};
    text-align: center;
    font-weight: bold;
    color: ${secondary};
    padding: 10px;
    fontFamily: 'Playfair';
    
`;

export const SubTitle = styled.Text`
    font-size: ${({ isLargeText }) => (isLargeText ? '23px' : '18px')};
    text-align: center;
    margin-bottom: 20px;
    letter-spacing: 1px;
    font-weight: bold;
    color: ${secondary}
`;

export const StyledFormArea = styled.View`
    width: 300px;
`;

export const StyledTextInput = styled.TextInput`
    background-color: ${secondary};
    padding: 15px;
    padding-left: 55px;
    padding-right: 55px;
    border-radius: 5px;
    font-size: ${({ isLargeText }) => (isLargeText ? '21px' : '16px')};
    height: 50px;
    margin-vertical: 3px;
    margin-bottom: 10px;
    color: ${tertiary};
`;

export const MsgBox = styled.Text`
    text-align: center;
    font-size: ${({ isLargeText }) => (isLargeText ? '18px' : '13px')};
    color: ${secondary}
`;


export const StyledInputLabel = styled.Text`
    color: ${darkLight};
    font-size: ${({ isLargeText }) => (isLargeText ? '20px' : '15px')};
    text-align: left;
`;

export const LeftIcon = styled.View`
    left: 15px;
    top: 30px;
    position: absolute;
    z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
    right: 15px;
    top: 30px;
    position: absolute;
    z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${brand};
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    height: 45px;
    flex-direction: row;
    
`;
export const StyledLogoutContainer = styled.View`
    padding: 5px;
    justify-content: center;
    align-items: center;
    margin-vertical: 70%;
    height: 68px;
    width: 120px;
    border-width: 2px;
    border-color: ${secondary};
    border-radius: 10px;
`;

export const StyledLogoutButton = styled.TouchableOpacity`
    padding: 10px;
    background-color: ${secondary};
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-vertical: 5px;
    height: 45px;
    width: 100px;
    flex-direction: row;
    
`;

export const ButtonText = styled.Text`
    color: ${primary};
    font-size: ${({ isLargeText }) => (isLargeText ? '23px' : '18px')};
`;


export const Line = styled.View`
    height: 1px;
    width: 100%;
    background-color: ${darkLight};
    margin-vertical: 10px;
`;

export const ExtraView = styled.View`
    justify-content: center;
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

export const ExtraText = styled.Text`
    justify-content: center;
    align-content: center;
    color: ${tertiary};
    font-size: ${({ isLargeText }) => (isLargeText ? '21px' : '16px')};
`;

export const TextLink = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
`;

export const TextLinkContent = styled.Text`
    color: ${darkLight};
    font-size: ${({ isLargeText }) => (isLargeText ? '21px' : '16px')};
`;

//for home menu --> user to select journal or tarot reading
export const LinkButton = styled.TouchableOpacity`
    border-radius: 10px;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: ${brand};
`;


export const InnerHomeContainer = styled.View`
    flex: 1;
    margin-top: 100%;
    align-items: center;
    justify-content: center;
`;

export const QuestionContainer = styled.View`
    flex: 1;
    margin-top: 125%;
    align-items: center;
    justify-content: center;
`;



export const LinkButtonContainer = styled.View`
    padding: 5px;
    justify-content: center;
    align-items: center;
    margin-vertical: 10px;
    height: 68px;
    width: 320px;
    border-width: 2px;
    border-color: ${secondary};
    border-radius: 18px;
`;

export const LinkButtonLabel = styled.Text`
    color: ${secondary};
    fontFamily: 'Playfair';
    font-size: ${({ isLargeText }) => (isLargeText ? '28px' : '23px')};
`;


export const DisplayCardImage = styled.Image`
    height: 170px;
    width: 120px;
    resize-mode: "cover";
`;

export const DailyFlatList = styled.FlatList`
    flex: 1;
    width: 100%;
    margin-top: 10px;

`;

export const DailyFlatListItem = styled.Pressable`
    background-color: ${secondary};
    padding : 15px;
    margin-vertical: 8px;
    margin-horizontal: 16px;
    border: solid;
`;

export const DailyFlatListTitle = styled.Text`
    font-size: ${({ isLargeText }) => (isLargeText ? '25px' : '20px')};
    fontFamily: 'Playfair';
    color: ${primary};
`;

export const DailyFlatButton = styled.Pressable`
    margin-left: 10px;
    
`;

export const StyledButtonContainer = styled.View`
    flex-direction: row;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
`;

export const StyledResultButtonContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 5px
`;

export const SwitchContainer = styled.View`
    margin-top: 5%;
    flex-direction: row;
    align-items: center;
`;

export const StyledImageBackground = styled.ImageBackground`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
    justify-content: center;
    align-items: center;
`;


export const StyledResultContainerView = styled.View`
    width: 80%;
    border: dashed;
    border-color: ${secondary};
    align-items: center;
    justify-content: center;
`;

export const StyledResultImage = styled.Image`
    height: 200px;
    width: 100px;
    align-items: center;
`;

export const StyledResultTextView = styled.View`
    padding: 0px 10px 0px 10px;    
    justify-content: center;
    align-items: center;
`;

export const StyledResultText = styled.Text`
    font-size: ${({ isLargeText }) => (isLargeText ? '23px' : '18px')};
    color : ${secondary};
`;


export const StyledResultButtonA = styled.TouchableOpacity`
    flex: 1;
    padding: 10px;
    background-color: ${brand};
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    margin-horizontal: 5px;
    height: 40px;
    flex-direction: row;
    justify-content: center;
`;

export const StyledResultButtonB = styled.TouchableOpacity`
    flex: 1;
    padding: 10px;
    background-color: ${secondary};
    align-items: center;
    border-radius: 5px;
    margin-vertical: 5px;
    margin-horizontal: 5px;
    height: 40px;
    flex-direction: row;
    justify-content: center;
`;

export const StyledScrollView = styled.ScrollView`
    flex: 1;
    width: 100%;
    height: 100%;
`;