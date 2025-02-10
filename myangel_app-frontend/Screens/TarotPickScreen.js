import React from 'react';
import { CardPickContainer, PageTitle, StyledImageBackground, StyledContainer, InnerCardContainer } from "../styles/components-styles"
import Card from "../components/Cards";

export default function TarotPickScreen() {
    return (
        <StyledContainer>
            <StyledImageBackground
                source={require("../assets/home.png")} />
                <CardPickContainer>
                    <PageTitle>Pick a card</PageTitle>
            <InnerCardContainer>
                {/* after press it should link to result of each cards which will generate based on id of each cards*/}
                <Card />
                <Card />
                <Card />
            </InnerCardContainer>
            </CardPickContainer>
        </StyledContainer>
    )
}