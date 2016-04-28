import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    ToastAndroid,
    ScrollView,
    TextInput,
    Linking,
    WebView
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';
import Camera from 'react-native-camera';

var shittyQs = require('shitty-qs')

//const FoodieAPI = require('./FoodieAPI');

import {FoodieAPI} from './FoodieAPI';

var Setting = React.createClass({

    getInitialState() {
        return {
            user: FoodieAPI.getToken()
        };
    },

    componentWillMount (){
        this.tokenChangeListener = (token)=>this.setState({user: token})
        FoodieAPI.addTokenListener(this.tokenChangeListener);
    },

    componentWillUnmount(){
        FoodieAPI.removeTokenListener(this.tokenChangeListener);
    },

    render() {
        return(
            <View style={styles.all}>
                <View style={styles.title}>
                    <TouchableHighlight
                        style={styles.back_button}
                        onPress={()=>this.props.navigator.pop()}
                        >
                        <Text>{" <-- "}</Text>
                    </TouchableHighlight>
                    <Text style={styles.titleText}>setting</Text>
                </View>
                <ScrollView style={styles.container}>
                    <Text>settings!</Text>
                    <GoogleSigninButton
                        style={{width: 150, height: 48}}
                        size={GoogleSigninButton.Size.Icon}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.sign}
                        />
                    <TouchableHighlight
                        style={{borderWidth: 1}}
                        //onPress={()=>this.refs.navigator.pop({id: 'me'})}
                        onPress={()=>FoodieAPI.testHelloworld()}
                        >
                        <Text>test api</Text>
                    </TouchableHighlight>
                    <TextInput multiline={true} style={{flex:1, height:100}}>{this.state.user}</TextInput>
                </ScrollView>
            </View>
        );
    },
    sign(){
        this.props.navigator.push({
            source: {uri: 'https://accounts.google.com/o/oauth2/v2/auth?scope=email&response_type=token&redirect_uri=https://net-arenx-foodie.appspot.com/&client_id=755058913802-g2atj31r9k53k9mnkg8e4qsjppj6vj23.apps.googleusercontent.com'},
            id :'webview',
            javaScriptEnabled: true,
            domStorageEnabled: true,
            decelerationRate: 'normal',
            automaticallyAdjustContentInsets: false,
            onNavigationStateChange: (event)=>{
                // ToastAndroid.show('onNavigationStateChange()', ToastAndroid.SHORT);
                var query_string = event.url.match(/\#(.*)/);
                if (!query_string) {
                      return;
                }
                query_string = query_string[0].slice(1);
                var query = shittyQs(query_string);
                //this.setState({user: query.access_token});
                FoodieAPI.setToken(query.access_token);
                this.props.navigator.pop();
            }
        });
    }
});

const styles = StyleSheet.create({
    all:{
        flex: 1,
    },
    title: {
        flexDirection:'row',
        borderWidth: 1,
        margin: 2,
        height:50
    },
    titleText: {
        flex: 1,
    },
    back_button: {
        borderWidth: 1,
        margin: 2,
    },
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 2,
    }
});

AppRegistry.registerComponent('Setting', () => Setting);
module.exports = Setting;
