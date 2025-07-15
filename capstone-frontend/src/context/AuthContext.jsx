import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        const storedToken = localStorage.getItem('authToken');
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await loginUser(username, password);
            const { token, user: userDataFromServer } = response;
            const currentUserData = {
                username: userDataFromServer.username,
                role: userDataFromServer.role,
                id: userDataFromServer.id,
                email: userDataFromServer.email
            };
            setUser(currentUserData);
            localStorage.setItem('currentUser', JSON.stringify(currentUserData));
            localStorage.setItem('authToken', token);
            return true;
        } catch (error) {
            console.error('Login failed:', error);
            setUser(null);
            localStorage.removeItem('currentUser');
            localStorage.removeItem('authToken');
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    const isAuthenticated = !!user && !!localStorage.getItem('authToken');
    const hasRole = (requiredRole) => isAuthenticated && user?.role === requiredRole;

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, hasRole, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
