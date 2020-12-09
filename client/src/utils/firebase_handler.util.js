import firebase from "react-native-firebase";
import moment from "moment";
import {Notification, NotificationOpen} from "react-native-firebase";

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
        });
    },

    OpenNotifications: function(){
        Firebase.notifications().onNotificationOpened((notificationOpen: NotificationOpen) => {
            // Get the action triggered by the notification being opened
            const action = notificationOpen.action;
            console.log(action)
            // Get information about the notification that was opened
            const notification: Notification = notificationOpen.notification;
            console.log(notification)
        });
    }

}

export default FirebaseHandler;
