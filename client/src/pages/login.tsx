import { useState } from "react";
import PasswordField from "../components/PasswordField";
import InputField from "../components/InputField";

const Login = () => {
    const [passwordError, setpasswordError] = useState("")
    const [userError, setUserError] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = () => {
        console.log(username, password)
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

                <button className="btn btn-primary my-4" onClick={handleSubmit}>Login</button>
                <p className="text-center text-sm text-gray-500 my-4">
                    Don’t have an account?{" "}
                    <a href="/register" className="link link-primary">
                        Sign up
                    </a>
                </p>
            </fieldset>
        </div>
    );
};

export default Login;
