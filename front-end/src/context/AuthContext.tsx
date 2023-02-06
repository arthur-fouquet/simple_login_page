import * as React from 'react';

interface AuthContextType {
    authTokens: string;
    setAuthTokens: React.Dispatch<any>;
    logout: () => void;
}

const AuthContext = React.createContext<AuthContextType>(null!);

export default AuthContext;

export function AuthProvider({ children }: ({ children: React.ReactNode })) {
    let [authTokens, setAuthTokens] = React.useState<any>(() =>
        localStorage.getItem("authToken")
            ? localStorage.getItem("authToken")!
            : null
    );

    let logout = () => {
        console.log("JSUIS LA");
        setAuthTokens(null);
        localStorage.removeItem('authToken');
    };

    const contextData = {
        authTokens,
        setAuthTokens,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            { children }
        </AuthContext.Provider>
    )
};

