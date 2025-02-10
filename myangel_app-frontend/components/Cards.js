import React from "react";
import { DisplayCardImage } from "../styles/components-styles";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useCredentialsContext } from "../context/user";
import { useQuestionContext } from "../context/question";
import { useCardContext } from "../context/card";
import { useIsEditContext } from "../context/isEdit";
import { useQuestionIdContext } from "../context/questionId";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// create card object in TarotPickScreen
export default function Card() {
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

  // const user_name = storedCredentials.decodedName;
  // const user_email = storedCredentials.decodedEmail;
  const userHashedId = storedCredentials.userHashedId; //partition key
  // generate the ramdomize algorithm
  const noOfCard = 21;
  const randomInt = (max) => Math.floor(Math.random() * (max + 1));

  const onPress = async () => {
    const cardId = randomInt(noOfCard);
    const uuidv4Num = uuidv4()
    const journalId = String(uuidv4Num) // sort key + make sure that this pass as string

    try {
      console.log("Sending request to:", createJournalUrl);
      console.log("Payload:", {
        user: userHashedId,
        id: journalId,
        question,
        card_id: cardId,
      });

      const response = await axios.post(createJournalUrl, {
        user: userHashedId,
        id: journalId,
        question: question,
        card_id: cardId,
      });

      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);

      if (response.status === 201) {
        setCard(cardId);
        navigation.navigate("Result");
      }
    } catch (error) {
      console.log("Error in API request:", error);
    }
  };
  return (
    <Pressable onPress={onPress} hitSlop={20}>
      <DisplayCardImage source={cardImg} />
    </Pressable>
  );
}
