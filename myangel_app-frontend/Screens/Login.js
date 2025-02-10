import React, { useState, useEffect } from "react";
import { View, Modal } from "react-native";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  MsgBox,
  StyledFormArea,
  StyledInputLabel,
  StyledTextInput,
  StyledButton,
  ButtonText,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  StyledImageBackground,
} from "../styles/components-styles";
import { Formik } from "formik";
import { Colors } from "../styles/components-styles";
import { useNavigation } from "@react-navigation/native";
import { MyTextInput } from "../components/ui/form";
// Read information from idToken and Accesstoken
import { jwtDecode } from "jwt-decode";
// Create hash value from user email
import CryptoJS from "crypto-js";
// Import AWS services: AWS Cognito
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

// keeping and calling user login data
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCredentialsContext } from "../context/user";

// initialize AWS cognito
// TODO: using secret manager
const poolData = {
  UserPoolId: "ap-southeast-2_0hjfEuOPn",
  ClientId: "7kff2ir73ppq5ttsjigk9vof4f",
};
const userPool = new CognitoUserPool(poolData);

const { brand, darkLight } = Colors;

export default function Login() {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [tempEmail, setTempEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigation = useNavigation();
  const { setStoredCredentials } = useCredentialsContext();

  // in case of user already login
  useEffect(() => {
    const autoLogin = async () => {
      const credentials = await AsyncStorage.getItem("angelappCredentials");
      if (credentials) {
        setStoredCredentials(credentials);
      }
    };
    autoLogin();
  }, []);

  const generateHashedId = (email) => {
    return CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);
  };

  const handleLogin = async (credentials) => {
    const { email, password } = credentials;

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: async (session) => {
        console.log("Login Successful", session);
        // getJwtToken is used for idToken and accessToken
        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        // getToken is used for refreshToken
        const refreshToken = session.getRefreshToken().getToken();

        let decodedName = "Guest";
        let decodedEmail = "guest@email.com"

        // get user name from the accessToken
        try {
          const decodedToken = jwtDecode(idToken);
          decodedName = decodedToken.given_name;
          decodedEmail = decodedToken.email;
          
        } catch (err) {
          console.log("Error decoding token:", err);
        }

        // generate a hased user ID
        const hashedUserId = generateHashedId(decodedEmail);

        // save session tokens in AsyncStorage
        const userData = {
          decodedName,
          decodedEmail,
          hashedUserId,
          idToken,
          accessToken,
          refreshToken,
        };
        await AsyncStorage.setItem(
          "angelappCredentials",
          JSON.stringify(userData)
        );
        setStoredCredentials(userData);

        handleMessage("Login complete");
        console.log("This is decoded name", decodedName);
        console.log("This is decoded email", decodedEmail);
        console.log("This is hashed user ID:", hashedUserId);

        navigation.navigate("Home");
      },
      onFailure: (err) => {
        console.log("Login Failed", err);
        handleMessage(err.message || "Authentication failed");
      },
    });
  };

  const handleMessage = (message) => {
    setMessage(message);
  };

  const handleRegister = () => {
    navigation.navigate("Signup");
  };

  const handleForgetPassword = (email) => {
    if (!email) {
      setMessage("Please enter your email first.");
      return;
    }
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.forgotPassword({
      onSuccess: () => {
        console.log("Password reset request sent");
        setMessage("A verification code has been sent to your email");
        setShowVerificationPopup(true);
        setTempEmail(email);
      },
      onFailure: (err) => {
        console.log("Error:", err);
        setMessage(err.message || "Something went wrong");
      },
    });
  };

  const handleResetPassword = () => {
    if (!tempEmail || !verificationCode || !newPassword) {
      setMessage("Please fill all fields");
      return;
    }

    const cognitoUser = new CognitoUser({
      Username: tempEmail,
      Pool: userPool,
    });

    cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        console.log("Password successfully changed!");
        setMessage("Your password has been reset. Please log in.");
        setShowVerificationPopup(false);
        setTimeout(() => navigation.navigate("Login"), 2000);
      },
      onFailure: (err) => {
        console.log("Reset Error", err);
        setMessage(err.message || "Failed to reset password.");
      },
    });
  };

  return (
    <StyledContainer>
      <StyledImageBackground source={require("../assets/bg-login.png")} />
      <InnerContainer>
        <PageTitle>Account Log in</PageTitle>

        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            if (values.email === "" || values.password === "") {
              handleMessage("Please fill all fields");
            } else {
              handleLogin(values);
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email"
                icon="mail"
                placeholder="Your email"
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
              <MsgBox>{message}</MsgBox>
              <Line />
              <StyledButton onPress={handleSubmit}>
                <ButtonText>Log in</ButtonText>
              </StyledButton>

              <ExtraView>
                <ExtraText>
                  Don't have an account already?
                </ExtraText>
                <TextLink onPress={handleRegister}>
                  <TextLinkContent>Sign Up</TextLinkContent>
                </TextLink>
              </ExtraView>

              <ExtraView>
                <ExtraText>
                  Forget password?
                </ExtraText>
                <TextLink onPress={() => handleForgetPassword(values.email)}>
                  <TextLinkContent>Reset Password</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
      
      {/* show the popup if showVerificationPopup = true */}
      {showVerificationPopup && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showVerificationPopup}
          onRequestClose={() => {
            setShowVerificationPopup(false);
            setVerificationCode("");
            setNewPassword("");
          }}
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
              <PageTitle>Reset Password</PageTitle>
              <StyledInputLabel>Enter the verification code:</StyledInputLabel>
              <StyledTextInput
                placeholder="Verification Code"
                placeholderTextColor={darkLight}
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
              <StyledInputLabel>Enter a new password:</StyledInputLabel>
              <StyledTextInput
                placeholder="New Password"
                placeholderTextColor={darkLight}
                value={newPassword}
                secureTextEntry={true}
                onChangeText={setNewPassword}
              />
              <StyledButton onPress={handleResetPassword}>
                <ButtonText>Confirm Reset</ButtonText>
              </StyledButton>
              <TextLink onPress={() => setShowVerificationPopup(false)}>
                <TextLinkContent>Cancel</TextLinkContent>
              </TextLink>
            </View>
          </View>
        </Modal>
      )}
    </StyledContainer>
  );
}
