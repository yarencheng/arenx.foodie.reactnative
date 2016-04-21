import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    ToastAndroid
} from 'react-native';

import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';



class Setting extends Component {
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
                <View style={styles.container}>
                    <Text>settings!</Text>
                        <GoogleSigninButton
                            style={{width: 150, height: 48}}
                            size={GoogleSigninButton.Size.Icon}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.sign}
                            />
                </View>




            </View>
        );
    }
    sign(){
        GoogleSignin.configure({
            scope: ['https://www.googleapis.com/auth/userinfo.email'],
            //iosClientId: '???', // only for iOS
            webClientId: '755058913802-g2atj31r9k53k9mnkg8e4qsjppj6vj23.apps.googleusercontent.com',
            offlineAccess: true
        });

        GoogleSignin.signIn()
        .then((user) => {
            //console.log(user);
            //this.setState({user: user});
            ToastAndroid.show('user '+user, ToastAndroid.SHORT);
        })
        .catch((err) => {
            //console.log('WRONG SIGNIN', err);
            ToastAndroid.show('fail '+err, ToastAndroid.SHORT);
        })
        .done();
    }
}

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
