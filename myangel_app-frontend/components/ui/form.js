import React from "react";
import { View } from "react-native";
import { Octicons, Ionicons } from "@expo/vector-icons";
import { StyledInputLabel, StyledTextInput, Colors, LeftIcon, RightIcon } from "../../styles/components-styles";
const { brand, darkLight } = Colors;

export const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isLargeText, ...props }) => {
    return (
        <View>
             {/* Left-side icon */}
            <LeftIcon>
                <Octicons name={icon} size={30} color={brand} />
            </LeftIcon>

            {/* Label for the input */}
            <StyledInputLabel isLargeText={isLargeText}>{label}</StyledInputLabel>
            
            {/* The actual input field */}
            <StyledTextInput {...props} />

            {/* Password visibility toggle button */}
            {/* If isPassword is true, it renders the <RightIcon> component */}
            {isPassword && (
                <RightIcon onPress={() => setHidePassword(!hidePassword)}>
                    <Ionicons name={hidePassword ? 'eye-outline' : 'eye-off-outline'} size={30} color={darkLight} />
                </RightIcon>
            )}
        </View>
    )
}