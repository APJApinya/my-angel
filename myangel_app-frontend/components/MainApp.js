import React, { useEffect } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesome5 } from "@expo/vector-icons";
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// import components
import SettingsScreen from "../Screens/SettingScreen";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/Login";
import SignupScreen from "../Screens/Signup";
import JournalsScreen from "../Screens/JournalsScreen";
import AboutScreen from "../Screens/AboutScreen";
import TarotPickScreen from "../Screens/TarotPickScreen";
import TarotQuestionScreen from "../Screens/TarotQuestionScreen";
import TarotResultScreen from "../Screens/TarotResultScreen";
import AppProviders from '../components/AppProviders';
import { useCredentialsContext } from '../context/user';

//create bottom tab navigator
const Tab = createBottomTabNavigator();

// create stack of pages
const TarotStack = createStackNavigator();
const LoginStack = createStackNavigator();

function TarotStackNavigator() {
    return (
        <TarotStack.Navigator initialRouteName="Welcome">
            <TarotStack.Screen name="Welcome" component={HomeScreen} options={{ headerShown: false }}/>
            <TarotStack.Screen name="AskQuestion" component={TarotQuestionScreen} options={{ headerShown: false }}/>
            <TarotStack.Screen name="TarotPick" component={TarotPickScreen} options={{ headerShown: false }}/>
            <TarotStack.Screen name="Result" component={TarotResultScreen} options={{ headerShown: false }}/>
        </TarotStack.Navigator>
    );
}

function LoginNavigator() {
    return (
        <LoginStack.Navigator>
            <LoginStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <LoginStack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }}/>
            <LoginStack.Screen name="TarotStack" component={TarotStackNavigator} options={{ headerShown: false }} />
        </LoginStack.Navigator>
    );
}

// switching between two navigator depend on storedCredentials
function HomeNavigator() {
    const { storedCredentials } = useCredentialsContext();
    const isLoggedIn = storedCredentials !== null;

    return isLoggedIn ? (
        <TarotStackNavigator />
    ) : (
        <LoginNavigator />
    );
}

export default function MainApp() {
    const { storedCredentials } = useCredentialsContext();
    const isLoggedIn = storedCredentials !== null;

    useEffect(() => {
        async function prepare() {
            try {
              // Prevent the splash screen from auto-hiding
              await SplashScreen.preventAutoHideAsync();
              // Simulate loading process
              await new Promise(resolve => setTimeout(resolve, 2000));
            } catch (e) {
              console.warn(e);
            } finally {
              await SplashScreen.hideAsync();
            }
          }
        prepare();
    }, []);

    const [fontsLoaded, fontError] = useFonts({
        'Playfair': require('../assets/fonts/PlayfairDisplay-Regular.ttf'),
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync(); // Hide splash only when fonts are loaded
        }
    }, [fontsLoaded, fontError]);
    

    if (!fontsLoaded && !fontError) {
        return null;
    }


    return (
        <NavigationContainer>
            <AppProviders>
                {/* Bottom menu */}
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ color, size }) => {
                            let iconName;
                            if (route.name === "Home") iconName = "home";
                            else if (route.name === "Journals") iconName = "book";
                            else if (route.name === "About") iconName = "question-circle";
                            else if (route.name === "Settings") iconName = "cog";
                            return <FontAwesome5 name={iconName} size={size} color={color} />;
                        },
                    })}
                >
                    {/* Home tab, which conditionally renders TarotStackNavigator or LoginNavigator */}
                    {/* This is setted as the first render page */}
                    <Tab.Screen name="Home" component={HomeNavigator} />
                    {/* Journals tab, allowing users to view and manage journal entries */}
                    <Tab.Screen name="Journals" component={JournalsScreen} />
                    {/* About tab, providing information about the application */}
                    {/* TODO: Might change to daily reading tab */}
                    <Tab.Screen name="About" component={AboutScreen} />
                    {/* Setting tab, allowing user to set the profile and logout */}
                    <Tab.Screen name="Settings" component={SettingsScreen} />
                </Tab.Navigator>
            </AppProviders>
        </NavigationContainer>
    );
}