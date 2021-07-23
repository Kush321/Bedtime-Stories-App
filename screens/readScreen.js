import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';


export default class ReadScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            search: '',
            allStories: [],
            lastVisibleTransaction: null,
        }
    }

    searchBooks = async (text) => {
            const submit = await db.collection("submit").where('storyName', "==", text)
            submit.docs.map((doc) => {
                this.setState({
                    allStories: [this.state.allStories, doc.data()],
                    lastVisibleTransaction: doc
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.titlePoster}>
                    <Text style={styles.title}>Story Hub</Text>
                </TouchableOpacity>
                <View style={styles.searchBar}>
                    <TextInput
                        style={styles.bar}
                        placeholder="Enter Story Name"
                        onChangeText={(text) => { this.setState({ search: text }) }} />
                    <TouchableOpacity
                        style={styles.searchButton}
                        onPress={() => { this.searchBooks(this.state.search) }}
                    >
                        <Text>Search</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={this.state.allStories}
                    renderItem={({ item }) => (
                        <View style={{ borderBottomWidth: 2 }}>
                            <Text>{"Story Name: " + item.storyName}</Text>
                            <Text>{"Author Name: " + item.authorName}</Text>
                        </View>
                    )}
                    keyExtractor={(item, index) => index.toString()}
                >
                    <Text>End</Text></FlatList>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchBar: {
        flexDirection: 'row',
        marginTop: 25,
        width: 'auto',
        alignItems: 'center',
        backgroundColor: 'grey',
        alignSelf: 'center'

    },
    bar: {
        borderWidth: 2,
        height: 30,
        width: 300,
        paddingLeft: 10,
    },
    searchButton: {
        borderWidth: 1,
        height: 30,
        width: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'green'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 36,
        marginTop: 10,
        textAlign: 'center'
    },
    rand: {
        fontWeight: 'bold',
        textAlignVertical: 'center',
        fontSize: 100,
        textAlign: 'center',
        marginTop: 100
    },
    titlePoster: {
        backgroundColor: 'pink',
        height: 75,
        textAlign: 'center',
    }
});