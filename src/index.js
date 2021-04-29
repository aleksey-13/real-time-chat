import React, { createContext } from 'react'
import ReactDOM from 'react-dom'
import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'

import App from './App'

firebase.initializeApp({
    apiKey: 'AIzaSyBr2wwrzgeaFBBf34zfGdrdnB5C-ol13KI',
    authDomain: 'chat-react-8198b.firebaseapp.com',
    projectId: 'chat-react-8198b',
    storageBucket: 'chat-react-8198b.appspot.com',
    messagingSenderId: '376436749216',
    appId: '1:376436749216:web:8b363613a536a6ad4a6ac5'
})

export const Context = createContext(null)

const auth = firebase.auth()
const firestore = firebase.firestore()

ReactDOM.render(
    <Context.Provider value={{ firebase, auth, firestore }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
)
