import { createContext, useContext, useState, useEffect } from 'react';
import userApi from '../api/userApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const userId = localStorage.getItem('userId');
        const userData = localStorage.getItem('userData');
        if (userId && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch {
                localStorage.removeItem('userId');
                localStorage.removeItem('userData');
            }
        }
        setLoading(false);
    }, []);

    /**
     * Login: fetch users and match by email (demo approach - no JWT)
     */
    const login = async (email, password) => {
        if (!email || !password) throw new Error('Vui lòng nhập email và mật khẩu');

        // Fetch a large page to find user by email
        const res = await userApi.getAllUsers(0, 200);
        const pageData = res.data?.data || res.data;
        const users = pageData?.content || (Array.isArray(pageData) ? pageData : []);

        const foundUser = users.find(
            (u) => u.email?.toLowerCase() === email.toLowerCase()
        );

        if (!foundUser) {
            throw new Error('Email không tồn tại trong hệ thống');
        }

        // Store in localStorage
        localStorage.setItem('userId', String(foundUser.userId));
        localStorage.setItem('userData', JSON.stringify(foundUser));
        setUser(foundUser);
        return foundUser;
    };

    /**
     * Register: create new user via API
     */
    const register = async ({ firstName, lastName, email, phone, password }) => {
        const payload = {
            fullName: `${firstName} ${lastName}`.trim(),
            email,
            phone,
            password,
        };

        const res = await userApi.createUser(payload);
        const newUser = res.data?.data || res.data;

        if (newUser?.userId) {
            localStorage.setItem('userId', String(newUser.userId));
            localStorage.setItem('userData', JSON.stringify(newUser));
            setUser(newUser);
        }
        return newUser;
    };

    /**
     * Logout: clear localStorage and state
     */
    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('userData');
        setUser(null);
    };

    /**
     * Update user data in context (after profile edit)
     */
    const updateUserData = (updatedUser) => {
        localStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
