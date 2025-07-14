import apiClient from './apiClient';

export const loginUser = async (username, password) => {
    const response = await apiClient.post('/users/login', { username, password });
    return response.data;
};

export const registerBusinessOwner = async (userData) => {
    const response = await apiClient.post('/users/register/business-owner', userData);
    return response.data;
};

export const registerCashier = async (userData) => {
    const response = await apiClient.post('/users/register/cashier', userData);
    return response.data;
};

export const registerInventoryManager = async (userData) => {
    const response = await apiClient.post('/users/register/inventory-manager', userData);
    return response.data;
};
