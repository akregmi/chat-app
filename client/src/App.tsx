import Login from "./pages/login"
import Signup from "./pages/signup"
import { Routes, Route } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
import Homepage from "./pages/homepage"

function App() {
    const {user, loading} = useAuthContext()
    if (loading) return null

    return (
        <>
            <Routes>
                <Route path="/" element={user ? <Homepage /> : <Login />}/>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />}></Route>
            </Routes>
        </>
    )
}

export default App;