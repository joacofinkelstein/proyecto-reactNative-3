import React, {Component} from 'react';
import { db, auth } from '../firebase/config';
import { View,
         Text,
         TouchableOpacity, 
         StyleSheet, 
         ActivityIndicator,
         FlatList, 
         Image } from 'react-native';
import Post from './Post';

class Home extends Component {
    constructor(props){
        super(props);
        this.state={
            posts:[], 
        
        }
    }
    
    componentDidMount(){
        db.collection('posts').orderBy('createdAt', 'desc').onSnapshot(
            docs => {
                let posts = [];
                docs.forEach( oneDoc => {
                    // console.log(oneDoc);
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
        // console.log(this.state);
        return(
                <View style={styles.container}>
                    <Text>Posteos</Text>
                    <FlatList 
                        data={this.state.posts}
                        keyExtractor={post => post.id}
                        renderItem = { ({item}) => <Post dataPost={item} 
                        {...this.props} />}
                    />
                    
                </View>

        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: '4%',
        backgroundColor: 'white'
    },
    content: {
        
        alignItems: 'center',
        marginTop: 80, 
        marginBottom: 60
    }, 
    box: {
        width: 150, 
        height: 100, 
        backgroundColor: 'white', 
        marginBottom: 10

    }

})

export default Home;