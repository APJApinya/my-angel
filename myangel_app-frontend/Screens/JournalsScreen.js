import React, { useState, useCallback } from "react";
import {
  JournalsContainer,
  StyledImageBackground,
  StyledContainer,
  MsgBox,
  PageTitle,
  DailyFlatList,
  DailyFlatListItem,
  DailyFlatListTitle,
  StyledButtonContainer,
} from "../styles/components-styles";
import { Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../styles/components-styles";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useTheme } from "../context/theme";
import { useCredentialsContext } from "../context/user";
import { useCardContext } from "../context/card";
import { useIsEditContext } from "../context/isEdit";
import { useQuestionIdContext } from "../context/questionId";
import axios from "axios";

const { brand, secondary, primary } = Colors;

export default function JournalsScreen() {
  const [data, setData] = useState([]);
  const { isLargeText } = useTheme();
  const { storedCredentials } = useCredentialsContext();
  const { setCard } = useCardContext();
  const navigation = useNavigation();
  
  // const user_name = storedCredentials.decodedName;
//   const user_email = storedCredentials.decodedEmail;
  const userHashedId = storedCredentials.userHashedId; // partition key
  // pass partition key as parameters 
  const getJournalsUrl = `https://w7ady0n0oe.execute-api.ap-southeast-2.amazonaws.com/get?user=${userHashedId}`;

  // Fetch data from API
  const fetchData = async () => {
    try {
      const response = await axios.get(getJournalsUrl);

      const data = response.data;
      // Handle cases where API might return body as a stringified JSON (body is string)
      const parsedJournals = typeof data.body === "string" ? JSON.parse(data.body).journals : data.journals;
      
      setData(parsedJournals);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
    // Do something when the screen is focused. the data will be re-fetched every time the user navigates back to this screen
      fetchData();
    }, [storedCredentials])
  );

  const handleSeeResultPress = (cardId) => {
    setCard(cardId);
    navigation.navigate("Result");
  };

  const renderItem = ({ item }) => (
    <DailyFlatListItem onPress={() => handleSeeResultPress(item.card_id)}>
      <DailyFlatListTitle isLargeText={isLargeText}>
        {item.question}
      </DailyFlatListTitle>
      <StyledButtonContainer>
        {/* <DailyFlatButton onPress={() => handleDeletePress(item.)}>
          <Ionicons name={"trash-outline"} size={30} color={primary} />
        </DailyFlatButton> */}
      </StyledButtonContainer>
    </DailyFlatListItem>
  );

  return (
    <StyledContainer>
      <StyledImageBackground source={require("../assets/bg-login.png")} />
      <JournalsContainer>
        <PageTitle isLargeText={isLargeText}>Your angel records</PageTitle>
        <MsgBox isLargeText={isLargeText}>
          view the detail by clicking on the box
        </MsgBox>
        <DailyFlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </JournalsContainer>
    </StyledContainer>
  );
}
