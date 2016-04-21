

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator
} from 'react-native';

const LocationWall = require('./LocationWall');
const MeTab = require('./MeTab');

const _navigator_stack= [{id: 'nearby'},{id: 'search'},{id: 'camera'},{id: 'like'},{id: 'me'}];

class FoodieApp extends Component {
    _navigator_stack=  [{id: 'nearby'},{id: 'search'},{id: 'camera'},{id: 'like'},{id: 'me'}]

    render() {
        return (
            <View style={styles.all}>

                <Navigator
                    ref="navigator"
                    style={styles.wall}
                    initialRouteStack={this._navigator_stack}
                    renderScene={this.navigatorRenderScene}/>

                <View style={styles.toolbar}>
                    <TouchableHighlight
                        style={styles.toolbarButton}
                        onPress={()=>this.refs.navigator.jumpTo(this._navigator_stack[0])}>
                        <Text>nearby</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.toolbarButton}
                        onPress={()=>this.refs.navigator.jumpTo(this._navigator_stack[1])}>
                        <Text>search</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.toolbarButton}
                        onPress={()=>this.refs.navigator.jumpTo(this._navigator_stack[2])}>
                        <Text>camera</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.toolbarButton}
                        //onPress={()=>this.refs.navigator.jumpTo({id: 'like'})}
                        onPress={()=>this.refs.navigator.jumpTo(this._navigator_stack[3])}
                        >
                        <Text>like</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.toolbarButton}
                        //onPress={()=>this.refs.navigator.pop({id: 'me'})}
                        onPress={()=>this.refs.navigator.jumpTo(this._navigator_stack[4])}
                        >
                        <Text>me</Text>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
    _onPressButton() {

    }
    navigatorRenderScene(route, navigator) {
        switch (route.id) {
            case 'me':
                return (<MeTab navigator={navigator}/>);
            default:
                return (<Text>{route.id}</Text>);
        }
    }
}

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
