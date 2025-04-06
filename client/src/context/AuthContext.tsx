import { createContext, ReactNode, useContext, useEffect, useState } from "react";

type User = {
    id: string,
    username: string,
    profilePic: string
}

type AuthUserType = {
    user: User | null,
    setUser: (user: User | null) => void,
    loading: boolean,
    logout: () => void
}

const AuthContext = createContext<AuthUserType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("/api/auth/me", { credentials: "include" })
                const data = await res.json()
                if (!res.ok) {
                    throw new Error(data.error)
                }
                setUser(data.user)
            } catch (error) {
                console.log("Error fetching user session: ", error)
            } finally {
                setLoading(false)
            }
        }

        fetchUser()
    }, [])

    const logout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
            credentials: "include",
        });
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
}