import Login from "./pages/login"
import Signup from "./pages/signup"
import HomePage from "./pages/homepage"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"

function App() {
    const {user, loading} = useAuthContext()
    if (loading) return null
    
    return (
        <>
            <Routes>
                <Route path="/" element={user ? <HomePage /> : <Login />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </>
    )
}

export default App
