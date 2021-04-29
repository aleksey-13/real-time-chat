import { Avatar, Button, Container, Grid, TextField } from '@material-ui/core'
import React, { useContext, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Context } from '..'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import Loader from './Loader'
import firebase from 'firebase'

function Chat() {
    const { auth, firestore } = useContext(Context)
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    const sendMessage = async () => {
        firestore.collection('messages').add({
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
            text: value,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('')
    }

    if (loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 50 }}
                justify="center"
            >
                <div
                    style={{
                        width: '80%',
                        height: '70vh',
                        border: '1px solid gray',
                        overflowY: 'auto',
                        margin: '20px'
                    }}
                >
                    {messages.map((message) => (
                        <div
                            key={message.createdAt}
                            style={{
                                margin: 10,
                                border:
                                    user.uid === message.uid
                                        ? '2px solid green'
                                        : '2px dashed red',
                                marginLeft:
                                    user.uid === message.uid ? 'auto' : 10,
                                width: 'fit-content',
                                padding: 5
                            }}
                        >
                            <Grid container>
                                <Avatar src={message.photoURL} />
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    ))}
                </div>
                <Grid
                    container
                    direction="column"
                    alignItems="flex-end"
                    style={{ width: '80%' }}
                >
                    <TextField
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        variant="outlined"
                        fullWidth
                        rowsMax={2}
                    />
                    <Button variant="outlined" onClick={sendMessage}>
                        Отправить
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Chat
