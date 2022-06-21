import React, { Component } from 'react';
import { db, auth } from '../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Image
} from 'react-native';
import Post from './Post';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            email: '',
            whoIs: '',
        }
    }

    // Obtener información a partir de una búsqueda.
    search(email) {
        db.collection('posts').where('owner', '==', email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach(oneDoc => {
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts,
                    email: '',
                    whoIs: this.state.email,
                })
            }
        )


    }


    render() {
        // console.log(this.state);
        return (
            <View style={styles.box}>
                <Text>Posts del usuario: {this.state.whoIs}</Text>
                <View style={styles.form}>
                    <TextInput
                        style={styles.field}
                        keyboardType='default'
                        placeholder='email a buscar...'
                        value={this.state.email}
                        onChangeText={text => this.setState({ email: text })}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => this.search(this.state.email)}
                        
                        disabled={this.state.email == '' ? true : false}
                    >
                        <Text style={styles.buttonText}>Buscar</Text>
                    </TouchableOpacity>
                </View>
                {this.state.posts.length == 0 ? <Text>El usuario no existe o aún no tiene publicaciones.</Text> : (


                    <>
                        <FlatList
                            data={this.state.posts}
                            keyExtractor={post => post.id}
                            renderItem={({ item }) => <Post dataPost={item}
                                {...this.props} />}
                        />
                    </>)}
            </View>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    box:{
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        margin: 10,
    },
    form: {
        flex: 1,
        gap: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
    },
    field: {
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding: 3,
        marginBottom: 8,
        width: '70%',
        marginBottom: 0,
        height: 40,
    },
    button: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding:3,
        backgroundColor: 'red',
        width: 100, 
        height: 40
    },
    buttonText: {
        color: '#fff'
    }
})

export default Search;