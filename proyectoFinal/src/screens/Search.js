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
                    whoIs: email,
                })
            }
        )


    }


    render() {
        // console.log(this.state);
        return (
            <View>
                
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
                                //👇 Les dejo un dato sorpresa para los que llegaron hasta acá: así se deshabilita un touchable opacity
                                disabled={this.state.email == '' ? true : false}
                            >
                                <Text style={styles.buttonText}>Buscar</Text>
                            </TouchableOpacity>
                        </View>
                        {this.state.posts.length == 0 ? <Text>No existen resultados para tu criterio de busqueda</Text> : (


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
    form: {
        flex: 1,
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
        lineHeight: 40,
    },
    button: {
        borderRadius: 2,
        padding: 3,
        backgroundColor: 'green',
        width: '29%',
        textAlign: 'center',
    },
    buttonText: {
        color: '#fff'
    }
})

export default Search;