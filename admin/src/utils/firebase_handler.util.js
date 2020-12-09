import firebase from "firebase";
import configs from "../configs.json";
import moment from "moment";

const Firebase = firebase.initializeApp(configs.firebase);

const FirebaseHandler = {

    Authenticate: async function(){
        const account = JSON.parse(localStorage.getItem("account"));
        await Firebase.auth().signInWithCustomToken(account.firebase_token);
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
    }
}

export default FirebaseHandler;
