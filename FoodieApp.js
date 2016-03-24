

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View
} from 'react-native';

const LocationWall = require('./LocationWall');

class FoodieApp extends Component {
    render() {
        return (
            <LocationWall/>
        );
    }
}


AppRegistry.registerComponent('FoodieApp', () => FoodieApp);
module.exports = FoodieApp;
