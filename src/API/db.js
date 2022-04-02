import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyCKlGcRJ7n1xbLnIGQObIiGanICztxmuG4',
  authDomain: 'managerz-ob.firebaseapp.com',
  projectId: 'managerz-ob',
  storageBucket: 'managerz-ob.appspot.com',
  messagingSenderId: '639216437398',
  appId: '1:639216437398:web:54a07f1cdee98766a65ab7',
  measurementId: 'G-MDRHJ624H3',
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
