import { useAuthContext } from "../context/AuthContext"

const HomePage = () => {
    const {user} = useAuthContext()
    return(
        <h1>Welcome {user?.username}</h1>
    )
}

export default HomePage