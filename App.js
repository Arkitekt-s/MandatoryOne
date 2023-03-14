import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from "./Pages/LoginPage";

import HomePage from "./Pages/HomePage";


const Stack = createStackNavigator();



function App  ()  {


    return (
        //screenOptions={{ headerShown: false }} means that the header will not be shown
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Page1' }} />
                <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Page2' }} />
            </Stack.Navigator>

    );
}

export default () => {
    return (
        <NavigationContainer>
            <App />
        </NavigationContainer>
    );
}
