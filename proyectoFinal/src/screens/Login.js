import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';


class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email: '',
            password: '',
        }
    }


    render(){
        //Falta implementar for de login y el método que viene de mainNavigation 
        return(
                <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='Email'
                    onChangeText={text => this.setState({ email: text})}
                />
                <TextInput 
                    style={styles.field}
                    keyboardType='default'
                    placeholder='password'
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text})}
                />
                <TouchableOpacity disabled={this.state.email.length===0 || this.state.password.length===0? true: false} style={styles.button} onPress={()=>this.props.route.params.login(this.state.email, this.state.password)}>
                    <Text style={ styles.buttonText}>Ingresar</Text>
                </TouchableOpacity>   
                <Text style={styles.error}> {this.props.errores} </Text>
                 <TouchableOpacity onPress={ ()=>this.props.navigation.navigate('Registro') }>
                        <Text style={styles.link}>No tengo cuenta</Text>
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


export default Login;