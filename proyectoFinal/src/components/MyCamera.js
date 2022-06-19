import  React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
} from 'react-native';
import {Camera} from 'expo-camera';
import { db, storage } from '../firebase/config';

class MyCamera extends Component{

    constructor(props){
        super(props)
        this.state = {
            permission: false,
            showCamera: true,
            url:''
        }  
        this.metodosDeCamara = '' 
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
            .then( () => this.setState({
            permission: true,
                })
            )
            .catch(error => console.log(error))

    }

    sacarFoto(){
        //usar un método de la cámara para sacar la foto.abs
        this.metodosDeCamara.takePictureAsync()
            .then(  photo => {
                this.setState({
                    //obtener la url temporal para guardarla en un estado.
                    url:photo.uri,
                    showCamera: false,
                })
            })
            .catch()


    }

    guardarFoto(){
        fetch(this.state.url)
            .then( response => response.blob())
            .then( 
                image => {
                    const ref = storage.ref(`photos/${Date.now()}.jpg`);
                    ref.put(image)
                        .then( () => {
                            ref.getDownloadURL()
                            .then( url => {
                                this.props.onImageUpload(url) //tiene que venir del padre.
                            })
                            .catch(error => console.log(error))
                        })
                        .catch(error => console.log(error))
                }
            )
            .catch(error => console.log(error))

    }

    eliminarPreview(){
        this.setState({
            url:"",
            showCamera: true,
        })
    }


    render(){
        return(
            <View style={styles.cameraBody}>
            { this.state.permission ?
                this.state.showCamera ?
                    <View style={styles.cameraBody}> 
                        <Camera 
                            style={styles.cameraBody}
                            type={Camera.Constants.Type.front}
                            ref= {metodosDeCamara => this.metodosDeCamara = metodosDeCamara}
                        />
                        <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>this.sacarFoto()}>
                            <Text>Tomar foto</Text>
                        </TouchableOpacity>
                    </View> 
                    :
                    <View style={styles.cameraBody}>
                        <Image 
                            style={styles.preview}
                            source={{uri:this.state.url}}
                            resizeMode='cover'
                        />
                        <TouchableOpacity 
                            style={styles.buttonGuardar}
                            onPress={()=>this.guardarFoto()}>
                            <Text>Guardar Foto</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.buttonEliminar}
                            onPress={()=>this.eliminarPreview()}>
                            <Text>Eliminar</Text>
                        </TouchableOpacity>
                    </View> 
                :
                <Text> No tengo permisos de cámara</Text>
            }
            </View>
        )
    }

}

const styles = StyleSheet.create({
    cameraBody: {
        display: "flex",
        justifyContent:'center',
        flexDirection:'column',
        height: 250,
        width: '88%', 
        marginLeft: '6%', 
        marginBottom: '4%', 
    },
    button:{
        display: 'flex',
        backgroundColor: "white",
        height: 50,
        width: 150,
        borderRadius: 25, 
        alignItems: 'center',
        justifyContent:'center',
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 5,
        borderRadius: 4,
        marginTop: 10,
        marginLeft: '6%',  
        
    },
    buttonGuardar: {
        display: 'flex', 
        width: '30%', 
        backgroundColor: "red", 
        color: 'white', 
        marginTop: '5%', 
        marginLeft: '20%', 
        textAlign: 'center', 
        width: '60%', 
        padding: '2%',
    }, 
    buttonEliminar: {
        display: 'flex', 
        width: '30%', 
        backgroundColor: "red", 
        color: 'white', 
        marginTop: '5%', 
        marginLeft: '20%', 
        textAlign: 'center', 
        width: '60%', 
        padding: '2%',

    },
    preview:{
        height:'80%',
        flex: 6, 
        width: '100%',
    }
}) 

export default MyCamera;