import firebase from "firebase";
import configs from "../../configs.json";

const Firebase = firebase.initializeApp(configs.firebase);

const FirebaseHandler = {

    Authenticate:async function(){
        await Firebase.auth().signInWithCustomToken(global.account.firebase_token);
    },

    Write: function(url, object){
        Firebase.database().ref(url).push(object);
    },

    Read: function(url, callback){
        Firebase.database().ref(url).on('value',callback);
    }
}

export default FirebaseHandler;
