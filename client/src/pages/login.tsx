import { useState } from "react";
import PasswordField from "../components/PasswordField";
import InputField from "../components/InputField";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
    const { setUser } = useAuthContext()

    const [passwordError, setpasswordError] = useState("")
    const [userError, setUserError] = useState("")
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async () => {
        try{
            setLoading(true)
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username,
                    password
                })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setUser(data)
        } catch(error: any){
            console.log(error);
            (error.message === "User doesn't exist") ? setUserError(error.message) : setpasswordError("Something went wrong. Please try again later")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-dvh flex items-center justify-center bg-base-200">
            <fieldset className="fieldset shadow-xl w-xs bg-base-100 p-6 rounded-box">
                <label className="text-3xl font-bold text-center">Login</label>

                <InputField 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value) 
                        setUserError("")
                    }}
                    error={!!userError}
                    errorMessage={userError}
                />

                <PasswordField 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value) 
                        setpasswordError("")
                    }}
                    error={!!passwordError}
                    errorMessage={passwordError}
                />

                <button 
                    className="btn btn-primary my-4"
                    disabled={loading}
                    onClick={handleSubmit}>
                        {loading ? "Loading..." : "Login"}
                </button>
                <p className="text-center text-sm text-gray-500 my-4">
                    Don’t have an account?{" "}
                    <a href="/signup" className="link link-primary">
                        Sign up
                    </a>
                </p>
            </fieldset>
        </div>
    );
};

export default Login;
