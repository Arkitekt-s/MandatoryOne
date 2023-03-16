import React from 'react';
import {View, StyleSheet, Button, TextInput,Image} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {auth} from "../Config/FirebaseConfig";
import {COLORS} from "../constants";


const LoginPage = () => {
    let navigation = useNavigation();
    //make a username and password match
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    //handle login
    const handleLogin = () => {
        //read from username and password from firebase
        auth.signInWithEmailAndPassword(username, password)
            .then((userCredential) => {
                    // Signed in
                   let user = userCredential.user;
                    // ...
                    navigation.navigate('HomePage');
                    //success message
                    alert(user.email + " is logged in");
                }
            )
            .catch((error) => {
                let errorMessage = error.message;
                    //give an error message if username and password do not match
                    alert(errorMessage);

                }
            );
    }


    return (
        <View style={styles.container} backgroundColor={COLORS.primary}>
            {/*//login with username and password*/}
            <Image source={require('../assets/images/logo.png')} style={{width: 400, height: 100}}/>

            <TextInput
                value={username}
                onChangeText={setUsername}
                autoCapitalize={'none'}
                autoCorrect={false}
                autoFocus={true}
                placeholder="Enter username"
                containerStyle={{ padding: 10 }}
                style={styles.input}
                margin={20}

            />

            <TextInput
                value={password}
                onChangeText={setPassword}
                autoCapitalize={'none'}
                autoCorrect={false}
                autoFocus={true}
                placeholder="Enter password"
                //hide password
                secureTextEntry={true}
                containerStyle={{ padding: 10 }}
                style={styles.inputpassword}
                margin={20}
            />
            <Button title="Login" onPress={handleLogin}
                    color="#841584"
                    rounded={true}
            />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        // make it circle edge
        borderRadius: 20,
    },
    inputpassword: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        // make it circle edge
        borderRadius: 20,
    }
});

export default LoginPage;