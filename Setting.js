import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    Navigator
} from 'react-native';

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
                </View>

            </View>
        );
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
