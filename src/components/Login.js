import React, { useContext } from 'react'
import { Box, Button, Grid, Container } from '@material-ui/core'
import { Context } from '../index'
import firebase from 'firebase'

function Login() {
    const { auth } = useContext(Context)

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        const { user } = await auth.signInWithPopup(provider)
    }

    return (
        <Container>
            <Grid
                container
                style={{ height: window.innerHeight - 50 }}
                alignItems="center"
                justify="center"
            >
                <Grid
                    style={{ width: 400, background: 'lighgray' }}
                    container
                    alignItems="center"
                    direction="column"
                >
                    <Box p={5}>
                        <Button variant="outlined" onClick={login}>
                            Войти с помощью Google
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Login
