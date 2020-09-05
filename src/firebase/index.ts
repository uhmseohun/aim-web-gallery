import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyA5N9C8yrx0pxS5nqQFf5Rs3olXW_kZJu8',
  authDomain: 'aim-gallery-2055d.firebaseapp.com',
  databaseURL: 'https://aim-gallery-2055d.firebaseio.com',
  projectId: 'aim-gallery-2055d',
  storageBucket: 'aim-gallery-2055d.appspot.com',
  messagingSenderId: '688801153033',
  appId: '1:688801153033:web:b6c39cb9629fa53617b8d8',
  measurementId: 'G-BFRG9CB7JD',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
