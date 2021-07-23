import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, TextInput, KeyboardAvoidingView, ToastAndroid, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class CreateScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      authorName: '',
      storyName: '',
      writtenStory: ''
    }
  }

  submitStory = async () => {
    db.collection("submit").add({
      'authorName': this.state.authorName,
      'storyName': this.state.storyName,
      'writtenStory': this.state.writtenStory
    })
    this.setState({
      authorName: '',
      storyName: '',
      writtenStory: ''
    })
    alert("Your Story Was Successfully Submitted")
  }

  render() {
    return (
      <KeyboardAvoidingView>
        <View>
          <TouchableOpacity style={styles.titlePoster}>
            <Text style={styles.title}>Story Hub</Text>
          </TouchableOpacity>
          <View>
            <TextInput
              style={styles.titleBox}
              placeholder="Title"
              onChangeText={
                text => this.setState({
                  storyName: text
                })
              }>
            </TextInput>
            <TextInput
              style={styles.titleBox}
              placeholder="Author"
              onChangeText={
                text => this.setState({
                  authorName: text
                })
              }>
            </TextInput>
            <TextInput
              style={styles.bigBox}
              placeholder="Write Your Story"
              multiline={true}
              onChangeText={
                text => this.setState({
                  writtenStory: text
                })
              }>
            </TextInput>
            <TouchableOpacity style={styles.submitButton}
              onPress={this.submitStory}>
              <Text style={{ marginTop: 15 }}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 10,
    textAlign: 'center'
  },
  titlePoster: {
    backgroundColor: 'pink',
    height: 75,
    textAlign: 'center',
  },
  titleBox: {
    width: 300,
    height: 40,
    borderWidth: 1.5,
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50
  },
  bigBox: {
    width: 300,
    height: 275,
    borderWidth: 1.5,
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  submitButton: {
    backgroundColor: 'pink',
    width: 100,
    height: 50,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    borderRadius: 25
  }
});
