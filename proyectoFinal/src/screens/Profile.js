import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    FlatList,
} from 'react-native';

import Post from './Post'


class Profile extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            posts:[],
        }
    }

    componentDidMount(){
        db.collection('posts').where('owner','==', auth.currentUser.email).onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    console.log(oneDoc.data());
                    posts.push({
                        id: oneDoc.id,
                        data: oneDoc.data()
                    })
                })

                this.setState({
                    posts: posts, 
                    loading: false
                
                })
            }
        )

        
    }



    render(){
        console.log(auth);
        console.log(this.state.posts);
        //Incluir en el render un ToucheableOpacity para ejecutar el método de logout que viene del padre. ¿Quién es el padre?
        return(
                <View style={styles.container}>
                    <Text style={styles.title}> Mi Perfil</Text>
                    {/* User + Mail */}
                    <View>  
                        <Text style={styles.texto}>{auth.currentUser.email}</Text>
                        <Text></Text>
                    </View>
                    {/*Last Online + Cant*/}
                    <View>
                        <Text>Last Online: {auth.currentUser.metadata.lastSignInTime}</Text>
                        <Text>Cantidad de Posteos: {this.state.posts.length}</Text>
                    </View>
                    <View style={styles.container}>
                        <Text>Posteos</Text>
                        <FlatList 
                            data={this.state.posts}
                            keyExtractor={post => post.id}
                            renderItem = { ({item}) => <Post dataPost={item} 
                            {...this.props}
                            />}
                        />
                    </View>
                    <TouchableOpacity  onPress={()=>this.props.route.params.logout()}>
                        <Text>Logout</Text>
                    </TouchableOpacity>
                
                </View>
        )
    }

}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: "#fff", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: ' 4%', 

    }, 
    title:{
        fontSize: 24,
    },
    texto:{
        fontSize: 18,
    },
    image: {
        width: '34%', 
        height: '38%', 
        marginLeft: '34%',
    }, 
    content: {
        alignItems:'center', 
        marginTop: 80, 
        marginBottom: 60,
    }, 
    box: {
        width:100, 
        height: 100, 
        backgroundColor: 'white', 
        marginBottom: 10
    },
    

})

export default Profile;