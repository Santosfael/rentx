import React, { createContext, useState, useContext, ReactNode } from "react";
import { api } from "../services/api";


interface User {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface AuthState {
    token: string;
    user: User;
}

interface SignInCrententials {
    email: string;
    password: string;
}

interface AuthContexData {
    user: User;
    signIn: (credentials: SignInCrententials) => Promise<void>;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContexData>({} as AuthContexData);

function AuthProvider({ children }: AuthProviderProps) {
    const [ data, setData ] = useState<AuthState>({} as AuthState);

    async function signIn({ email, password }: SignInCrententials) {
        const response = await api.post('/sessions', {
            email,
            password,
        });

        const { token, user } = response.data;
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setData({token, user});
    }

    return (
        <AuthContext.Provider value={{
            user: data.user,
            signIn
        }}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth(): AuthContexData {
    const context = useContext(AuthContext);
    return context;
}

export { AuthProvider, useAuth };