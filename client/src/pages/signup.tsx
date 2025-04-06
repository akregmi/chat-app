import { useState } from "react";
import PasswordField from "../components/PasswordField";
import InputField from "../components/InputField";
import { useAuthContext } from "../context/AuthContext";

const Signup = () => {

    const { setUser } = useAuthContext()
    
    const [passwordError, setpasswordError] = useState("")
    const [userError, setUserError] = useState("")
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSignup = async () => {
        if (password !== confirmPassword){
            return setpasswordError("Both passwords must match")
        }
        if (password.length < 6) {
            return setpasswordError("Password must be 6 characters long")
        }

        try{
            setLoading(true)
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username,
                    password,
                    confirmPassword
                })
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data.error)
            setUser(data)
        } catch(error: any){
            (error.message === "User already exists") ? setUserError(error.message) : setpasswordError("Something went wrong. Please try again later")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-dvh flex items-center justify-center bg-base-200">
            <fieldset className="fieldset shadow-xl w-xs bg-base-100 p-6 rounded-box">
                <label className="text-3xl font-bold text-center">Register</label>

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
                />

                <PasswordField 
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value) 
                        setpasswordError("")
                    }}
                    error={!!passwordError}
                    errorMessage={passwordError}
                />

                <button 
                    className="btn btn-primary my-4"
                    disabled={loading}
                    onClick={handleSignup}>
                        {loading ? "Loading..." : "Sign Up"}
                </button>
                <p className="text-center text-sm text-gray-500 my-4">
                    Already have an account?{" "}
                    <a href="/login" className="link link-primary">
                        Log in
                    </a>
                </p>
            </fieldset>
        </div>
    );
};

export default Signup;