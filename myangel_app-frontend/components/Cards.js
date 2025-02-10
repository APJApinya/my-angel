import React from "react";
import { useState } from "react";
import { DisplayCardImage, ApiModalView, ApiPopupView, ApiPopupText } from "../styles/components-styles";
import { Pressable, Modal, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCredentialsContext } from "../context/user";
import { useQuestionContext } from "../context/question";
import { useCardContext } from "../context/card";
import { useIsEditContext } from "../context/isEdit";
import { useQuestionIdContext } from "../context/questionId";
import axios from "axios";
import uuid from "react-native-uuid";

// create card object in TarotPickScreen
const Card = () => {
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation();
  const cardImg = require("../assets/card.png");
  const createJournalUrl =
    "https://w7ady0n0oe.execute-api.ap-southeast-2.amazonaws.com/create";

  //get neccesary from contexts
  const { setCard } = useCardContext();
  const { storedCredentials } = useCredentialsContext();
  const { question } = useQuestionContext();

  // for edit function
  //   const { isEdit, setIsEdit } = useIsEditContext();
  //   const { questionId } = useQuestionIdContext();

  const userHashedId = storedCredentials.hashedUserId; //partition key

  // generate the ramdomize algorithm
  const noOfCard = 21;
  const randomInt = (max) => Math.floor(Math.random() * (max + 1));

  const onPress = async () => {
    setLoading(true);
    const cardId = randomInt(noOfCard);
    const uuidv4Num = uuid.v4();
    const journalId = String(uuidv4Num);
    try {
      const response = await axios.post(createJournalUrl, {
        user: userHashedId,
        id: journalId,
        question: question,
        card_id: cardId,
      });

      if (response.status === 201) {
        setCard(cardId);
        navigation.navigate("Result");
      }
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <><Modal transparent={true} animationType="fade" visible={loading}>
      <ApiModalView>
        <ApiPopupView>
          <ActivityIndicator size="large" color="#000000" />
          <ApiPopupText>Processing....</ApiPopupText>
        </ApiPopupView>
      </ApiModalView>
    </Modal><Pressable onPress={onPress}>
        <DisplayCardImage source={cardImg} />
      </Pressable></>
  )
}

export default Card;
