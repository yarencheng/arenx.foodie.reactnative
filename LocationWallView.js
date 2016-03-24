

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView
} from 'react-native';

class LocationWallView extends Component {
    render() {
        return (
            <View>

                <ScrollView horizontal={false}>
                    {this.props.place.photos.map((photo, i) => {
                        var uri = 'https://maps.googleapis.com/maps/api/place/photo?' +
                            'photoreference=' + photo.photo_reference + '&' +
                            'maxwidth=' + 400 + '&' +
                            'key=' + 'AIzaSyD0nEgcL96uyn9elYSngFlBXU-REG6FUzA';

                        return (<Image key={i}
                            source={{uri: uri}}
                            style={{width: 400, height: 400 }} />
                        );

                        //return (<Text key={i}>{uri}</Text>);

                    })}
                </ScrollView>

                <Text>{'Dish view'}</Text>
                <Text>{this.props.place.name}</Text>

            </View>
        );
    }
}


AppRegistry.registerComponent('LocationWallView', () => LocationWallView);
module.exports = LocationWallView;
