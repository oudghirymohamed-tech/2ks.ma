import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getAuthMe, login as apiLogin } from '../services/api';
const TOKEN_KEY = 'twoKS_auth_token';
const USER_KEY = 'twoKS_auth_user';
const AuthContext = createContext(undefined);
function readStoredUser() {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    }
    catch {
        return null;
    }
}
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) ?? '');
    const [user, setUser] = useState(() => readStoredUser());
    const [isLoading, setIsLoading] = useState(Boolean(localStorage.getItem(TOKEN_KEY)));
    useEffect(() => {
        if (!token) {
            setIsLoading(false);
            return;
        }
        getAuthMe()
            .then((response) => {
            setUser(response.user);
            localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        })
            .catch(() => {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            setToken('');
            setUser(null);
        })
            .finally(() => {
            setIsLoading(false);
        });
    }, [token]);
    const value = useMemo(() => ({
        token,
        user,
        isLoading,
        isAuthenticated: Boolean(token && user),
        login: async (loginValue, password) => {
            const result = await apiLogin(loginValue, password);
            localStorage.setItem(TOKEN_KEY, result.token);
            localStorage.setItem(USER_KEY, JSON.stringify(result.user));
            setToken(result.token);
            setUser(result.user);
        },
        logout: () => {
            localStorage.removeItem(TOKEN_KEY);
            localStorage.removeItem(USER_KEY);
            setToken('');
            setUser(null);
        },
        setSession: (nextToken, nextUser) => {
            localStorage.setItem(TOKEN_KEY, nextToken);
            localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
            setToken(nextToken);
            setUser(nextUser);
        }
    }), [token, user, isLoading]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }
    return context;
}
