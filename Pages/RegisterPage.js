import React from 'react';
import {View, StyleSheet,Text, TextInput, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {auth} from "../Config/FirebaseConfig";
import {COLORS} from "../constants";
//register page
const RegisterPage = () => {
    let navigation = useNavigation();
    //make a username and password match
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    //handle register

    const handleRegister = () => {
        //read from username and password from firebase
        auth.createUserWithEmailAndPassword(username, password)
            .then((userCredential) => {
                    // Signed in
                    let user = userCredential.user;
                    // log out to login page after register

                    navigation.goBack();
                    //success message
                    alert(user.email + " is registered");
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
            {/*//register with username and password*/}
            <Image source={require('../assets/images/logo.png')} style={{width: 300, height: 100}}
                        resizeMode="contain"/>
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
                containerStyle={{ padding: 10 }}
                style={styles.input}
                margin={20}
            />
            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
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
    button: {
        alignItems: 'center',
        backgroundColor: '#00A1F2',
        padding: 10,
        width: 100,
        height: 40,
        borderRadius: 20,
        margin: 12,
    },
    buttonText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        JustifyContent: 'center',
    }

});

export default RegisterPage;
