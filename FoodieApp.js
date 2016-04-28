

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator,
    WebView,
    CameraRoll,
    ToastAndroid
} from 'react-native';

import Camera from 'react-native-camera';

const LocationWall = require('./LocationWall');
const MeTab = require('./MeTab');
const CameraTab = require('./CameraTab');

var FoodieApp = React.createClass({
    navigatorStack:  [{id: 'nearby'},{id: 'search'},{id: 'camera'},{id: 'like'},{id: 'me'}],

    render() {
        return (
            <Navigator
                ref="navigatorApp"
                style={styles.all}
                initialRoute={{id: 'main'}}
                renderScene={this.navigatorRenderApp}/>
        );
    },

    navigatorRenderApp(route, navigator) {
        // ToastAndroid.show('app navigatorRenderScene() ' + navigator.getCurrentRoutes().length + ' '+ JSON.stringify(route), ToastAndroid.SHORT);
        switch (route.id) {
            case 'camera':
                return (<CameraTab
                    navigator={navigator}
                    />
                );
                //return (<Text>{route.id}</Text>);

            case 'main':
                return (
                    <View style={styles.all}>
                        <Navigator
                            ref="navigatorTab"
                            style={styles.wall}
                            initialRoute={this.navigatorStack[0]}
                            initialRouteStack={this.navigatorStack}
                            renderScene={this.navigatorRenderTab}
                            />

                        <View style={styles.toolbar}>
                            <TouchableHighlight
                                style={styles.toolbarButton}
                                onPress={()=>this.refs.navigatorApp.refs.navigatorTab.jumpTo(this.navigatorStack[0])}>
                                <Text>nearby</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.toolbarButton}
                                onPress={()=>this.refs.navigatorApp.refs.navigatorTab.jumpTo(this.navigatorStack[1])}>
                                <Text>search</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.toolbarButton}
                                onPress={()=>{
                                    this.refs.navigatorApp.push({id: 'camera'});
                                }}>

                                <Text>camera</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.toolbarButton}
                                onPress={()=>this.refs.navigatorApp.refs.navigatorTab.jumpTo(this.navigatorStack[3])}
                                >
                                <Text>like</Text>
                            </TouchableHighlight>
                            <TouchableHighlight
                                style={styles.toolbarButton}
                                onPress={()=>this.refs.navigatorApp.refs.navigatorTab.jumpTo(this.navigatorStack[4])}
                                >
                                <Text>me</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                );
        }
    },
    navigatorRenderTab(route, navigator) {
        switch (route.id) {
            case 'me':
                return (<MeTab navigator={navigator}/>);
            default:
                return (<Text>{route.id}</Text>);
        }
    },
});

const styles = StyleSheet.create({
    all:{
        flex: 1,
    },
    wall: {
        flex:1,
        //backgroundColor: '#FF0000',
    },
    toolbar: {
        flexDirection:'row',
        // backgroundColor: '#00FF00',
    },
    toolbarButton:{
        flex:1,
        height:50,
        //backgroundColor: '#00FF00',
        margin:2,
        borderWidth: 1
        //fontSize: 50
    }
});

AppRegistry.registerComponent('FoodieApp', () => FoodieApp);
module.exports = FoodieApp;
