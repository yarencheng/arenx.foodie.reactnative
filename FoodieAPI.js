//'use strict';

import React, {
    ToastAndroid,
} from 'react-native';

class FoodieAPI  {
    PhotoAPI= new PhotoAPI()
    constructor() {
        this.tokenChangeListeners = [];
        this.addTokenListener((token)=>this.PhotoAPI.token=token);
    }

    testHelloworld(){
        fetch('https://net-arenx-foodie.appspot.com/_ah/api/myApi/v1/testpost', {
            method: 'POST',
            headers: {
                'Authorization' : 'Bearer ' + this.token,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'name': 'test from FoodieAPI reactnative'
            })
        })
        .then((response) => response.json())
        .then((json) => {
            //console.log(responseText);
            //ToastAndroid.show('json='+JSON.stringify(json), ToastAndroid.LONG);
            return json;
        })
        .catch((error) => {
            ToastAndroid.show('error='+JSON.stringify(error), ToastAndroid.LONG);
        });
    }

    getToken(){
        return this.token || 'empty';
    }
    setToken(token){
        this.token = token;
        this.tokenChangeListeners.every((e)=>e(token));
    }
    addTokenListener(listener){
        if (0 > this.tokenChangeListeners.indexOf(listener)){
            this.tokenChangeListeners.push(listener);
        }
    }
    removeTokenListener(listener){
        var index = this.tokenChangeListeners.indexOf(listener);
        if (0 <= index){
            this.tokenChangeListeners.splice(index, 1);
        }
    }
}

class PhotoAPI  {
    root = 'https://net-arenx-foodie.appspot.com/_ah/api/photo/v1/';

    constructor(props) {

    };

    async add(location_id, description){
        try {
            var response = await fetch(this.root + 'add/' + location_id + '?description=' + description, {
                method: 'POST',
                headers: {
                    'Authorization' : 'Bearer ' + this.token
                }
            });
            var responseJson = await response.json();
            return responseJson;
        } catch(error) {
            // Handle error
            console.error(error);
            ToastAndroid.show('error='+JSON.stringify(error), ToastAndroid.SHORT);
        }
    };
    upload(remoteUri, photoUri){

        try {
            var photo = {
                uri: photoUri,
                type: 'image/jpeg',
                name: 'photo.jpg',
            };

            var body = new FormData();
            body.append('photo', photo);

            var xhr = new XMLHttpRequest ();
            xhr.open('POST', remoteUri);
            xhr.send(body);
        } catch(error) {
            // Handle error
            console.error(error);
            ToastAndroid.show('error='+JSON.stringify(error), ToastAndroid.SHORT);
        }
    };
}

module.exports = {FoodieAPI: new FoodieAPI()};
