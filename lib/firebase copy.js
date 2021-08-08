import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

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
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
	// your config
};

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
