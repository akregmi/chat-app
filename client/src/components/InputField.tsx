import { User } from "lucide-react"; 

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
    error: boolean
    errorMessage?: string
}


const InputField = ({ error, errorMessage, ...props }: Props) => {
    return (
        <>
            <label className={`input ` + (error ? "input-error" : "") + ` mt-8 pr-1`}>
                <User className="opacity-50" size={18} />
                <input type="input" {...props} />
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

export default InputField