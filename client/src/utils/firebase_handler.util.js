import firebase from "react-native-firebase";
import moment from "moment";
import {Notification} from "firebase"

const Firebase = firebase.app();

const FirebaseHandler = {

    Authenticate:async function(){
        await Firebase.auth().signInWithCustomToken(global.account.firebase_token);
    },

    Write: function(url, object){
        Firebase.database().ref(url).push(object);
    },

    Read: function(url, callback){
        Firebase.database().ref(url).on('value',callback);
    },

    ReadOnce: async function(url){
        return await Firebase.database().ref(url).once('value');
    },

    Listen: function(url,callback){
        Firebase.database().ref(url).orderByChild('at').startAt(moment().unix()).on('child_added', callback);
    },

    GetToken: async function(){
        return await firebase.messaging().getToken();
    },
    
    ListenToNotifications: async function(){
        Firebase.notifications().onNotification(async(notification) => {
            notification.android.setChannelId(notification.notificationId);
            await Firebase.notifications().displayNotification(notification).catch(err => console.error(err));;
            console.log("fuck");
        });
    }

}

export default FirebaseHandler;
