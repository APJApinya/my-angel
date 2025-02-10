import React, { useState, useEffect } from 'react';
import {
    StyledImageBackground, StyledContainer, InnerContainer, PageTitle, SubTitle, 
    StyledResultContainerView, StyledResultImage, StyledResultText, StyledResultTextView, StyledResultButtonA, StyledResultButtonB,
    StyledResultButtonContainer, JournalsContainer
} from "../styles/components-styles"
import { Text} from "react-native";
import { useCardContext } from '../context/card';
import { useNavigation } from '@react-navigation/native'
import axios from 'axios';

export default function TarotResultScreen() {
    const [cardData, setCardData] = useState();
    const { card } = useCardContext();
    const navigation = useNavigation();

    useEffect(() => {
        const getCardData = async () => {
            const getCardUrl = `https://sljop2il3c.execute-api.ap-southeast-2.amazonaws.com/cards?card_id=${card}`;

            try {
                const response = await axios.get(getCardUrl);
                const { card_name, card_description, card_image_url} = response.data;
                console.log("This is card image url: ", card_image_url)
                setCardData({card_name, card_description, card_image_url});
            } catch (err) {
                console.log("Error fetching card", err);
            }
        };
        getCardData();
    }, [card]);
   
    const handleBackToJournal = () => {
        navigation.navigate("Journals");
    }

    const handleBackToHome = () => {
        navigation.navigate("Welcome");
    }

    return (
        <StyledContainer>
            <StyledImageBackground
                source={require("../assets/bg-signup.png")} />
            <JournalsContainer>
                <StyledResultContainerView>
                    <PageTitle>Your Angel said...</PageTitle>
                    
                    {cardData && (
                        <>
                            <StyledResultImage source={{uri: cardData.card_image_url}} />
                            <SubTitle>{cardData.card_name}</SubTitle>
                            <StyledResultTextView>
                                <StyledResultText>{cardData.card_description}</StyledResultText>
                            </StyledResultTextView>
                            <StyledResultButtonContainer>
                                <StyledResultButtonA onPress={handleBackToJournal}>
                                    <Text>Back to Journal</Text>
                                </StyledResultButtonA>
                                <StyledResultButtonB onPress={handleBackToHome}>
                                    <Text>Back to Home</Text>
                                </StyledResultButtonB>
                            </StyledResultButtonContainer>
                        </>
                    )}
                </StyledResultContainerView>
            </JournalsContainer>
        </StyledContainer>
    );
}