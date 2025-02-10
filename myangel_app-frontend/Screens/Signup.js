import React, { useState } from "react";
import {
  StyledImageBackground,
  StyledContainer,
  InnerContainer,
  PageTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledInputLabel,
  StyledTextInput,
} from "../styles/components-styles";
import { StatusBar } from "expo-status-bar";
import { Formik } from "formik";
import { Colors } from "../styles/components-styles";
import { useNavigation } from "@react-navigation/native";
import { MyTextInput } from "../components/ui/form";
import { CognitoUserPool, CognitoUser } from "amazon-cognito-identity-js";
const { darkLight } = Colors;
import { View, Modal } from "react-native";
import { USER_POOL_ID, CLIENT_ID } from "@env";

// initialize AWS cognito
// TODO: using secret manager
const poolData = {
  UserPoolId: USER_POOL_ID,
  ClientId: CLIENT_ID,
};
const userPool = new CognitoUserPool(poolData);

// Function to fetch secrets from AWS SSM

export default function Signup() {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const navigation = useNavigation();

  const handleRegister = async (credentials) => {
    const { name, email, password } = credentials;

    const attributeList = [
      { Name: "given_name", Value: name },
      { Name: "email", Value: email },
    ];

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        console.log("Sign up error: ", err);
        setMessage(err.message || "Something went wrong");
        return;
      }

      console.log("Sign up Successful", result);
      setMessage("A verification code has been sent to your email.");

      // store email and show verification pop-up
      setTempEmail(email);
      setShowVerificationPopup(true);
    });
  };

  const handleLogin = () => {
    navigation.navigate("Login");
  };

  const handleVerification = () => {
    if (!tempEmail) {
      setMessage("Email is missing. Please sign up again.");
      return;
    }

    const cognitoUser = new CognitoUser({
      Username: tempEmail,
      Pool: userPool,
    });

    cognitoUser.confirmRegistration(verificationCode, true, (err, result) => {
      if (err) {
        console.log("Verification Error: ", err);
        setMessage(err.message || "Invalid verification code");
        return;
      }

      console.log("Verification successful", result);
      setMessage("Your email is verified! Redirect to login...");

      setTimeout(() => {
        setShowVerificationPopup(false);
        navigation.navigate("Login");
      }, 2000);
    });
  };

  return (
    <StyledContainer>
      <StatusBar />
      <StyledImageBackground source={require("../assets/bg-signup.png")} />
      <InnerContainer>
        <PageTitle>Account Sign Up</PageTitle>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            if (
              values.name === "" ||
              values.email === "" ||
              values.password === "" ||
              values.confirmPassword === ""
            ) {
              setMessage("Please fill all fields");
            } else if (values.password !== values.confirmPassword) {
              setMessage("Passwords are not matching");
            } else {
              handleRegister(values);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Name"
                icon="person"
                placeholder="Enter your name"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              <MyTextInput
                label="Email"
                icon="mail"
                placeholder="Enter your email"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="* * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />

              <MyTextInput
                label="Confirm Password"
                icon="lock"
                placeholder="* * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                value={values.confirmPassword}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />

              <MsgBox>{message}</MsgBox>
              <Line />
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Sign up</ButtonText>
              </StyledButton>
              <ExtraView>
                <ExtraText>
                  Already have an account?
                </ExtraText>
                <TextLink>
                  <TextLinkContent
                    onPress={handleLogin}
                  >
                    Log in
                  </TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>

      {/* show verification popup after sign up*/}
      {showVerificationPopup && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showVerificationPopup}
          onRequestClose={() => setShowVerificationPopup(false)}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "80%",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                alignItems: "center",
              }}
            >
              <PageTitle>Verify Email</PageTitle>
              <StyledInputLabel>
                Enter the verification code sent to {tempEmail}:{" "}
              </StyledInputLabel>
              <StyledTextInput
                placeholder="Verification Code"
                placeholderTextColor={darkLight}
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
              <StyledButton onPress={handleVerification}>
                <ButtonText>Confirm</ButtonText>
              </StyledButton>
              <TextLink
                onPress={() => {
                  setShowVerificationPopup(false);
                  setVerificationCode("");
                }}
              >
                <TextLinkContent>Cancel</TextLinkContent>
              </TextLink>
            </View>
          </View>
        </Modal>
      )}
    </StyledContainer>
  );
}
