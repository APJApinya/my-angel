import React, { useState } from "react";
import {
  QuestionContainer,
  StyledContainer,
  MsgBox,
  PageTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  Line,
  StyledImageBackground,
} from "../styles/components-styles";
import { StatusBar } from "expo-status-bar";
import { Colors } from "../styles/components-styles";
import { Formik } from "formik";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/theme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useQuestionContext } from "../context/question";
import { MyTextInput } from "../components/ui/form";

const { darkLight } = Colors;


export default function TarotQuestionScreen() {
  const { isLargeText } = useTheme();
  const { setQuestion } = useQuestionContext();
  const navigation = useNavigation();
  const [message, setMessage] = useState();

  return (
    <StyledContainer>
      <StatusBar />
      <StyledImageBackground source={require("../assets/home.png")} />
      <KeyboardAwareScrollView>
        <QuestionContainer>
          <PageTitle isLargeText={isLargeText}>
            Question for your Angel
          </PageTitle>

          <Formik
            initialValues={{ question: "" }}
            onSubmit={(values) => {
              if (values.question === "") {
                setMessage("Please fill in your question to angel");
              } else {
                //pass question to next
                setQuestion(JSON.stringify(values.question));
                navigation.navigate("TarotPick");
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <MyTextInput
                  label="What do you want to ask?"
                  icon="question"
                  placeholder="Ask a question"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("question")}
                  onBlur={handleBlur("question")}
                  value={values.question}
                />
                <MsgBox>{message}</MsgBox>
                <Line />
                <StyledButton onPress={handleSubmit}>
                  <ButtonText isLargeText={isLargeText}>
                    Reach to your angel
                  </ButtonText>
                </StyledButton>
              </StyledFormArea>
            )}
          </Formik>
        </QuestionContainer>
      </KeyboardAwareScrollView>
    </StyledContainer>
  );
}
