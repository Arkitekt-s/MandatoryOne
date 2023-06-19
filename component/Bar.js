import React from 'react';
import { StatusBar } from 'react-native';
import {useIsFocused} from "@react-navigation/native";

const Bar = (props) => {
    //useIsFocused() is a hook that returns true if the screen is focused and false if it is not focused.
    const isFocused = useIsFocused();
    //If the screen is focused, we return the StatusBar component with the props passed to it.
    return isFocused ?
        <StatusBar animated={true} {...props} /> : null;

};


export default Bar;
