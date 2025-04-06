import { useState } from "react";
import { Eye, EyeOff, KeyRound } from "lucide-react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    error: boolean
    errorMessage?: string
}


const PasswordField = ({error, errorMessage, ...props}: Props) => {
    const [showPassword, setShowPassword] = useState(false)

    return(
        <>
            <label className={`input `+(error ? "input-error" : "")+` mt-4 pr-1`}>
                <KeyRound className="opacity-50" size={18} />
                <input 
                    type={showPassword ? "text" : "password"}
                    {...props}
                />
                <button
                    type="button"
                    className="btn btn-ghost btn-xs opacity-50"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
            </label>
            {errorMessage ? 
                <p className="validator-hint text-error">
                    {errorMessage}
                </p>
                :
                null
            }
        </>
    )
}

export default PasswordField;