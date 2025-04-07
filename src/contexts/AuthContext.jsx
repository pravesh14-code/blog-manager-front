import { createContext, useContext, useState } from 'react';
import { registerUser, loginUser } from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [token, setToken] = useState(localStorage.getItem('token'));

    const register = async (formData) => {
        try {
            await registerUser(formData);
        } catch (err) {
            throw new Error("Registration Failed. Please try again later.");
        }
    };

    const login = async (formData) => {
        try {
            const res = await loginUser(formData);
            setUser(res.data.user);
            setToken(res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem('token', res.data.token);
        } catch (err) {
            throw err;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
