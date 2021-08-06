import firebase from 'firebase/app';
import 'firestore/auth';
import 'firestore/firestore';
import 'firestore/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyAeCzivXa6hb_jqPjzLtw6g_SclWISx5ag',
	authDomain: 'nextfire-22ced.firebaseapp.com',
	projectId: 'nextfire-22ced',
	storageBucket: 'nextfire-22ced.appspot.com',
	messagingSenderId: '810122284641',
	appId: '1:810122284641:web:f6e3f2c217c5773e412420',
};

if (!firebase.app.length) {
	firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
