import React, {Component} from 'react';
import { FontAwesome } from '@expo/vector-icons';
import {
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth, db} from '../firebase/config';
import firebase from 'firebase';

class Post extends Component{
    constructor(props){
        super(props)
        this.state={
           cantidadDeLikes: this.props.dataPost.data.likes.length,
           myLike:false,
        }
    }

    componentDidMount(){
        if(this.props.dataPost.data.likes.includes(auth.currentUser.email)){
            this.setState({
                myLike: true,
            })
        }
    }

    like(){
        //Agregar el email del user logueado en el array
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes + 1, //Se puede mejorar.
                myLike: true,
            }))
            .catch(error => console.log(error))

    }

    unLike(){
        //Agregar el email del user logueado en el array
        db.collection('posts')
            .doc(this.props.dataPost.id)
            .update({
                likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
            })
            .then(()=> this.setState({
                cantidadDeLikes:this.state.cantidadDeLikes - 1, //Se puede mejorar
                myLike: false
            }))
            .catch(error => console.log(error))
    }
    deletePost(){

        db.collection("posts").doc(this.props.dataPost.id).delete();
    }

    render(){
        console.log("los props del datapost",this.props.dataPost.data.owner);
        console.log("el usuario logueado", auth.currentUser.email)
        return(
                <View style={styles.separator}>
                    { this.props.dataPost.data.owner == auth.currentUser.email ?(
                    <TouchableOpacity onPress={()=> this.deletePost()}>
                            <Text>Eliminar Post</Text>
                    </TouchableOpacity> 
                    ):""}
                    <Text>Post de: {this.props.dataPost.data.owner}</Text>
                    <Image 
                        style={styles.image}
                        resizeMode='center'
                        source={{uri:this.props.dataPost.data.url}}
                    />
                    <Text>{this.props.dataPost.data.description}</Text>
                        {
                            this.state.myLike ?
                            <TouchableOpacity style={styles.detalles} onPress={()=> this.unLike()}>
                                <FontAwesome name="heart" size={20} color="red" />
                                <Text>{this.state.cantidadDeLikes}</Text>
                            </TouchableOpacity> :
                            <TouchableOpacity style={styles.detalles} onPress={()=> this.like()}>
                                <FontAwesome name="heart-o" size={20} color="red" />
                                <Text>{this.state.cantidadDeLikes}</Text>
                            </TouchableOpacity>                
                        }
                        <TouchableOpacity onPress={ () => this.props.navigation.navigate('Comentarios', { id: this.props.dataPost.id})} > 
                            <FontAwesome name="comments" size={20} color="black" />
                        </TouchableOpacity>  
                    
                </View>
        )
    }

}

const styles = StyleSheet.create({
    separator:{
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingHorizontal:20
    },
    image:{
        height: 300,
        width: 200,
    },
    detallesCont:{
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },
    detalles:{
        display: 'flex',
        gap: 5,
        flexDirection: 'row',
        
    }
    
})

export default Post;