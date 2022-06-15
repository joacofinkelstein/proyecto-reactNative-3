import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import {auth} from '../firebase/config';

class Register extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
            userName:''
        }
    }

    render(){
        console.log(this.state.email);
        console.log(this.state.password);
        console.log(this.props);
        return(
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='User Name'
                    onChangeText={text => this.setState({ userName: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text})}
                />
                <TouchableOpacity style={styles.button} 
                disabled={this.state.email.length===0 || this.state.password.length===0 || this.state.userName.length===0? true: false} onPress={()=>this.props.route.params.register(this.state.email, this.state.password, this.state.userName)}>
                    <Text style={styles.buttonText}>Registrarme</Text>
                </TouchableOpacity>   

                <Text style={styles.error}> {this.props.errores} </Text>
                 <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Login') }>
                        <Text style={styles.link}>Ya tengo cuenta</Text>
                 </TouchableOpacity>
            
            </View>

        )
    }

}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal:10,
        marginTop: 10,
        height: "100%", 
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        marginBottom:20, 
        fontSize: 30, 
        color: "red", 
    
    },
    field:{
        borderColor: '#dcdcdc',
        borderWidth: 1,
        borderRadius: 2,
        padding:3,
        marginBottom:8, 
        width: 250, 
        height: 30

    },
    button: {
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding:3,
        backgroundColor: 'green',
        width: 100, 
        height: 30
    },
    buttonText:{
        color: '#fff'
    }, 
    link: {
        color: "blue", 
        marginTop: 20, 
    }, 
    error: {
        color: "red", 
    }

})

export default Register;