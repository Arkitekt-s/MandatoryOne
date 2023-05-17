import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import HomePage from "./Pages/HomePage";
import {useFonts} from "expo-font";
import SellPage from "./Pages/SellPage";
import Googlemap from "./component/Googlemap";



const Stack = createStackNavigator();
const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent'
    }
}

const App = () => {
    const [loaded] = useFonts({
            InterBold: require('./assets/fonts/Inter-Bold.ttf'),
            InterRegular: require('./assets/fonts/Inter-Regular.ttf'),
            InterMedium: require('./assets/fonts/Inter-Medium.ttf'),
            InterSemiBold: require('./assets/fonts/Inter-SemiBold.ttf'),
            InterLight: require('./assets/fonts/Inter-Light.ttf'),
        }
    );
    if (!loaded) return null;



    return (
        //screenOptions={{ headerShown: false }} means that the header will not be shown
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginPage} options={{ title: 'Page1' }} />
                <Stack.Screen name="RegisterPage" component={RegisterPage} options={{ title: 'Page1-1' }} />
                <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Page2' }} />
                <Stack.Screen name="SellPage" component={SellPage} options={{ title: 'Page2-2' }} />
                <Stack.Screen name="Googlemap" component={Googlemap} options={{ title: 'Page2-3' }} />
            </Stack.Navigator>
            </NavigationContainer>
    );
};
        export default App;

