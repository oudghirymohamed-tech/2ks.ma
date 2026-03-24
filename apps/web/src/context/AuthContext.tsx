import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { getAuthMe, login as apiLogin, type ApiUser } from '../services/api';

const TOKEN_KEY = 'twoKS_auth_token';
const USER_KEY = 'twoKS_auth_user';

interface AuthContextValue {
    token: string;
    user: ApiUser | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (loginValue: string, password: string) => Promise<void>;
    logout: () => void;
    setSession: (token: string, user: ApiUser) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): ApiUser | null {
    const raw = localStorage.getItem(USER_KEY);

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw) as ApiUser;
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string>(() => localStorage.getItem(TOKEN_KEY) ?? '');
    const [user, setUser] = useState<ApiUser | null>(() => readStoredUser());
    const [isLoading, setIsLoading] = useState<boolean>(Boolean(localStorage.getItem(TOKEN_KEY)));

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

    const value = useMemo<AuthContextValue>(
        () => ({
            token,
            user,
            isLoading,
            isAuthenticated: Boolean(token && user),
            login: async (loginValue: string, password: string) => {
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
            setSession: (nextToken: string, nextUser: ApiUser) => {
                localStorage.setItem(TOKEN_KEY, nextToken);
                localStorage.setItem(USER_KEY, JSON.stringify(nextUser));
                setToken(nextToken);
                setUser(nextUser);
            }
        }),
        [token, user, isLoading]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used inside AuthProvider');
    }

    return context;
}
