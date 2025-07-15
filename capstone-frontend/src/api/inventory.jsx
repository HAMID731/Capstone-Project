import apiClient from './apiClient';

export const addItemToInventory = async (itemData) => {
    const response = await apiClient.post('/inventory', itemData);
    return response.data.data;
};

export const updateInventoryItem = async (itemId, updateData) => {
    const response = await apiClient.put(`/inventory/${itemId}`, updateData);
    return response.data;
};

export const updateInventoryStock = async (itemId, newQuantity) => {
    const response = await apiClient.patch(`/inventory/${itemId}/stock`, { quantity: newQuantity });
    return response.data;
};

export const removeInventoryItem = async (itemId) => {
    const response = await apiClient.delete(`/inventory/${itemId}`);
    return response.data;
};

export const getAllInventoryItems = async () => {
    const response = await apiClient.get('/inventory');
    return response.data;
};

export const getInventoryItemById = async (itemId) => {
    const response = await apiClient.get(`/inventory/${itemId}`);
    return response.data;
};
