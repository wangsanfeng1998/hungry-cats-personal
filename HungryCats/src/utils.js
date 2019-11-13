import firebase from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyD3nnHJp02-ZeipmqAD60PjVr1vcIcJpfY",
  authDomain: "react-shopping-cart-7d1d3.firebaseapp.com",
  databaseURL: "https://react-shopping-cart-7d1d3.firebaseio.com/",
  projectId: "react-shopping-cart-7d1d3",
  storageBucket: "react-shopping-cart-7d1d3.appspot.com",
  messagingSenderId: "476849977207",
  appId: "1:476849977207:web:b7eff48e3e3eb3195ed372"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

export {db};
