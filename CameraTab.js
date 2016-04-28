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
    WebView,
    CameraRoll,
    ListView,
    Image
} from 'react-native';


import {FoodieAPI} from './FoodieAPI';
var groupByEveryN = require('groupByEveryN');

var CameraTab = React.createClass({

    photos: [],

    getInitialState() {
        return {
            test: 'empty',
            photoDs: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])
        };
    },

    navigatorStack:  [{id: 'select'},{id: 'edit'}],

    render() {
        return(
            <Navigator
                ref="navigator"
                style={styles.wall}
                initialRoute={this.navigatorStack[0]}
                initialRouteStack={this.navigatorStack}
                renderScene={this.navigatorRenderScene}
                />
        );
    },
    navigatorRenderScene(route, navigator) {
        // ToastAndroid.show('camera navigatorRenderScene() ' + navigator.getCurrentRoutes().length + ' '+ JSON.stringify(route), ToastAndroid.SHORT);
        switch (route.id) {
            case 'select':
                //ToastAndroid.show('navigatorRenderScene() case select', ToastAndroid.SHORT);
                return (
                    <View
                        style={{
                            flex: 1
                        }}
                        >
                        <View style={{
                            flexDirection:'row',
                            borderWidth: 1,
                            margin: 2,
                            height:50
                        }}>
                            <TouchableHighlight
                                style={{
                                    borderWidth: 1,
                                    margin: 2}}
                                onPress={()=>this.props.navigator.pop()}
                                >
                                <Text>{" <-- "}</Text>
                            </TouchableHighlight>
                            <Text style={{flex: 1}}>select photos</Text>
                            <TouchableHighlight
                                style={{
                                    borderWidth: 1,
                                    margin: 2}}
                                onPress={()=>this.refs.navigator.jumpTo(this.navigatorStack[1])}
                                >
                                <Text>{" --> "}</Text>
                            </TouchableHighlight>
                        </View>

                            <PhotoGrid
                                ref="photoGrid"
                                style={{
                                    flex:1,
                                    borderWidth: 1, margin: 2,
                                }}
                                setSelectedPhoto={this.setSelectedPhoto}
                                />

                    </View>
                );
            case 'edit':
                //ToastAndroid.show('navigatorRenderScene() case adjust', ToastAndroid.SHORT);
                return (
                    <View
                        style={{
                            flex: 1
                        }}
                        >
                        <View style={{
                            flexDirection:'row',
                            borderWidth: 1,
                            margin: 2,
                            height:50
                        }}>
                            <TouchableHighlight
                                style={{
                                    borderWidth: 1,
                                    margin: 2}}
                                onPress={()=>this.refs.navigator.jumpTo(this.navigatorStack[0])}
                                >
                                <Text>{" <-- "}</Text>
                            </TouchableHighlight>
                            <Text style={{flex: 1}}>edit photos</Text>
                            <TouchableHighlight
                                style={{
                                    borderWidth: 1,
                                    margin: 2}}
                                onPress={this.uploadPhoto}
                                >
                                <Text>{" --> "}</Text>
                            </TouchableHighlight>
                        </View>
                        <PhotoEditor
                            ref="photoEditor"
                            />
                    </View>
                );
        }
    },
    selectedPhoto: null,
    setSelectedPhoto(photo){
        if (this.selectedPhoto) {
            this.selectedPhoto.select(false);
        }
        this.selectedPhoto = photo;
        if (this.selectedPhoto) {
            this.selectedPhoto.select(true);
        }
        this.refs.navigator.refs.photoEditor.setUri(photo.props.uri);
    },

    async uploadPhoto(){

        ToastAndroid.show('descript='+this.refs.navigator.refs.photoEditor.descript, ToastAndroid.SHORT);

        var photo = await FoodieAPI.PhotoAPI.add('5157655500816384', this.refs.navigator.refs.photoEditor.descript);
        FoodieAPI.PhotoAPI.upload(photo.upload_url, this.selectedPhoto.props.uri);
    }
});

var PhotoEditor = React.createClass({
    descript: null,
    getInitialState() {
        return {
            uri: 'http://facebook.github.io/react/img/logo_og.png',
            desHeight: 80
        };
    },
    render(){
        return(
            <View
                style={{
                    flex: 1
                }}
                >
                <View style={{
                    flexDirection:'row',
                    borderWidth: 1,
                    margin: 2,
                    //height:50
                }}>
                    <Image
                        source={{uri: this.state.uri}}
                        style={{
                            height: 80,
                            width: 80,
                            margin: 2, borderWidth: 1
                        }} />
                    <TextInput
                        placeholder={"say something"}
                        multiline={true}
                        style={{
                            flex:1,
                            margin: 2, borderWidth: 1,
                            height: (
                                this.state.desHeight < 150 ?
                                this.state.desHeight > 80 ?
                                this.state.desHeight : 80 : 150)
                        }}
                        onChange={(event) => {
                            this.setState({
                                text: event.nativeEvent.text,
                                desHeight: event.nativeEvent.contentSize.height,
                            });
                            //ToastAndroid.show('height='+event.nativeEvent.contentSize.height, ToastAndroid.LONG);
                        }}
                        onChangeText={(text) => this.descript=text}
                        />
                </View>
            </View>
        );
    },
    setUri(uri){
        //ToastAndroid.show(uri, ToastAndroid.LONG);
        this.setState({uri: uri});
    }

});

var PhotoGrid = React.createClass({
    photos: [],
    getInitialState() {
        return {
            photoDs: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows([])
        };
    },
    componentWillMount (){
        this.loadPhotos();
    },
    hasMorePhoto: true,
    loadPhotos(){
        if (!this.hasMorePhoto) {
            return;
        }
        var fetchParams: Object = {
            first: 20,
            assetType: 'Photos',
            after: this.photoCursor || ''
        };
        CameraRoll.getPhotos(fetchParams)
        .then((data) => {
            this.photoCursor = data.page_info.end_cursor;
            this.photos = this.photos.concat(data.edges);
            this.hasMorePhoto = data.page_info.end_cursor ? true : false;
            this.setState({
                photoDs: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(
                    groupByEveryN(this.photos,4)
                )
            });

        }, (e) => {
            ToastAndroid.show('camera error', ToastAndroid.LONG);
        });
    },
    render(){
        return(
            <ListView
                style={[{
                    borderWidth: 1, margin: 2,
                }, this.props.style]}
                showsHorizontalScrollIndicator={true}
                dataSource={this.state.photoDs}
                renderRow={this.renderRow}
                //initialListSize={10}
                onEndReached={this.loadPhotos}
                onEndReachedThreshold ={50}
                />
        );
    },

    rowId: 0,
    renderRow(photos){
        return(
            <PhotoRow
                key={this.rowId++}
                uris={
                    photos
                    //.filter((photo)=>photo)
                    .map((photo)=> photo ? photo.node.image.uri: 'http://facebook.github.io/react/img/logo_og.png')}
                setSelectedPhoto={this.props.setSelectedPhoto}
                />
        );
    },


});

var PhotoRow = React.createClass({
    id:0,
    render(){
        return(
            <View
                style={{
                    flexDirection:'row',
                    flex: 1,
                    borderWidth: 1, margin: 2
                }}>
                {this.props.uris.map((uri)=>
                    <PhotoView
                        key={this.props.key+'+'+(this.id++)}
                        uri={uri}
                        setSelectedPhoto={this.props.setSelectedPhoto}
                        />
                )}
            </View>
        );
    }
});

var PhotoView = React.createClass({
    getInitialState() {
        return {
            borderColor: 'red'
        };
    },
    render(){
        return(
            <TouchableHighlight
                //onLayout={this.onLayout}
                onPress={()=>{
                    //this.setState({borderColor: 'green'});
                    this.props.setSelectedPhoto(this);
                }}
                >
                <Image
                    source={{uri: this.props.uri}}
                    style={{
                        height: 80,
                        width: 80,
                        margin: 2, borderWidth: 1,
                        borderColor: this.state.borderColor
                    }} />
            </TouchableHighlight>
        );
    },
    select(select){
        //ToastAndroid.show(JSON.stringify(this.props.uri)+' '+select, ToastAndroid.LONG);
        this.setState({borderColor: select ? 'green' : 'red'});
    }
});

const styles = StyleSheet.create({
    all:{
        flex: 1,
    },
    wall: {
        flex: 1,
    },
});

AppRegistry.registerComponent('CameraTab', () => CameraTab);
module.exports = CameraTab;
