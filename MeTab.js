import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator
} from 'react-native';

const Setting = require('./Setting');

class MeTab extends Component {
    render() {
        return(
            <Navigator
                ref="navigator"
                //style={styles.wall}
                initialRoute={{id: 'main'}}
                renderScene={this.navigatorRenderScene}/>


        );
    }
    navigatorRenderScene(route, navigator) {
        switch (route.id) {
            case 'setting':
                return (<Setting navigator={navigator}/>);
            case 'main':
            default:
                return (
                    <View style={styles.all}>
                        <View style={styles.title}>
                            <Text style={styles.titleText}>user name</Text>
                            <TouchableHighlight
                                style={styles.setting_button}
                                onPress={()=>navigator.push({id: 'setting'})}
                                >
                                <Text>setting</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={styles.summary}>
                            <Text>summary</Text>
                        </View>
                        <View style={styles.container}>
                            <Text>other me!</Text>
                        </View>
                    </View>
                );
        }
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
    setting_button: {
        borderWidth: 1,
        margin: 2,
    },
    summary: {
        borderWidth: 1,
        margin: 2,
        height:100
    },
    container: {
        flex: 1,
        borderWidth: 1,
        margin: 2,
    }
});

AppRegistry.registerComponent('MeTab', () => MeTab);
module.exports = MeTab;
