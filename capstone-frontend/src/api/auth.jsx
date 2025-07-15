import apiClient from './apiClient';

export const loginUser = async (username, password) => {
    const response = await apiClient.post('/auth/login', { username, password });
    return response.data;
};

export const registerBusinessOwner = async (userData) => {
    const response = await apiClient.post('/auth/register/businessowner', userData);
    return response.data;
};

export const registerCashier = async (userData) => {
    const response = await apiClient.post('/auth/register/cashier', userData);
    return response.data;
};

export const registerInventoryManager = async (userData) => {
    const response = await apiClient.post('/auth/register/inventorymanager', userData);
    return response.data;
};


export const getAllUsers = async () => {
    const response = await apiClient.get('/auth');
    return response.data;
};

export const deleteUser = async (userId) => {
    const response = await apiClient.delete(`/auth/${userId}`);
    return response.data;
};

export const updateUserProfile = async (updateData) => {
    const response = await apiClient.put('/auth/profile', updateData);
    return response.data;
};