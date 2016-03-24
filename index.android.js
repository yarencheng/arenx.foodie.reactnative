import React, {
  AppRegistry,
  Component
} from 'react-native';

const FoodieApp = require('./FoodieApp');

class foodie extends Component {
  render() {
    return (
      <FoodieApp/>
    );
  }
}

AppRegistry.registerComponent('foodie', () => foodie);
