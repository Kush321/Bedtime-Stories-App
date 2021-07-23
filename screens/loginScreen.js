import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            emailID: '',
            password: ''
        }
    }
    login = async (emailID, password) => {
        if (emailID && password) {
            try {
                const response = await firebase.auth().signInWithEmailAndPassword(emailID, password);
                console.log(response)
                if (response) {
                    this.props.navigation.navigate('Create');
                }
            }
            catch (error) {
                switch (error.code) {
                    case 'auth/user-not-found':
                        alert("User Dosen't Exist")
                        console.log("doesn't exist")
                        break
                    case 'auth/invalid-email':
                        alert('Incorrect Email or Password')
                        console.log('invaild')
                        break
                }
            }
        }
        else { 
            alert('enter email and password'); }
    }
render() {
    return (
        <KeyboardAvoidingView style={styles.container}>
            <View>
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: 30,
                    }}>
                    Story Hub
                </Text>
            </View>
            <View>
                <TextInput
                    style={styles.inputBox}
                    placeholder="abc@example.com"
                    keyboardType="email-address"
                    onChangeText={
                        text => this.setState({
                            emailID: text
                        })
                    }>
                </TextInput>

                <TextInput
                    style={styles.inputBox}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={
                        text => this.setState({
                            password: text
                        })
                    }>
                </TextInput>
            </View>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        this.login(this.state.emailID, this.state.password)
                    }
                    }
                    style={styles.submitButton}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>

            </View>
        </KeyboardAvoidingView>
    )
}
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    displayText: { fontSize: 15, textDecorationLine: 'underline' },
    scanButton: { backgroundColor: '#2196F3' },
    buttonText: { fontSize: 20, marginTop: 8, marginLeft: 5, marginRight: 5 },
    inputView: { flexDirection: 'row', margin: 20 },
    inputBox: { width: 300, height: 40, borderWidth: 1.5, fontSize: 20, },
    submitButton: { backgroundColor: '#FBC02D', width: 100, height: 50, textAlign: 'center' }
});