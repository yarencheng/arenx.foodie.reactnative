

import React, {
    AppRegistry,
    Component,
    StyleSheet,
    Text,
    View,
    ListView,
    RecyclerViewBackedScrollView,
    ScrollView,
    RefreshControl,
} from 'react-native';

const LocationWallView = require('./LocationWallView');

var LocationWall = React.createClass({
    allreadyInit: false,

    getInitialState() {
        //this.updateLocation();
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            datastore: ds.cloneWithRows([])
        };
    },

    componentDidMount (){
        navigator.geolocation.getCurrentPosition(
            (location) => {
                if (!this.allreadyInit) {
                    this.updateLocation(location);
                    this.allreadyInit = true;
                }
                this.setState({location: location});
            },
            (error) => alert(error.message),
            {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000}
        );
    },

    async updateLocation(location) {
        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?' +
        'location=' + location.coords.latitude + ',' + location.coords.longitude + '&' +
        'rankby=' + 'distance' + '&' +
        'types=' + 'food' + '&' +
        'key=' + 'AIzaSyD0nEgcL96uyn9elYSngFlBXU-REG6FUzA')
        .then((response) => response.json())
        .then((response) => {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                datastore: ds.cloneWithRows(response.results.filter((e) => e.photos))
            });
        })
        .catch((error) => {
            console.warn(error);
        });
    },
    renderLocation(place) {
        return (<LocationWallView place={place}/>);
    },
    render() {
        return (
            <ListView showsHorizontalScrollIndicator={true}
                dataSource={this.state.datastore}
                renderRow={this.renderLocation}
                renderScrollComponent={props => <RecyclerViewBackedScrollView {...props} />}
                renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}


                />

        );
    }
});



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
    },
});


AppRegistry.registerComponent('LocationWall', () => LocationWall);
module.exports = LocationWall;
