import { BrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar'
import AppRouter from './components/AppRouter'
import Loader from './components/Loader'

import './App.css'
import { useContext } from 'react'
import { Context } from '.'
import { useAuthState } from 'react-firebase-hooks/auth'

function App() {
    const { auth } = useContext(Context)
    const [user, loading, error] = useAuthState(auth)

    if (loading) {
        return <Loader />
    }

    return (
        <BrowserRouter>
            <Navbar />
            <AppRouter />
        </BrowserRouter>
    )
}

export default App
