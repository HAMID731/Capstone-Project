import apiClient from './apiClient';


export const addItemToInventory = async (itemData) => {
    const response = await apiClient.post('/inventory/items', itemData);
    return response.data;
};


export const updateInventoryItem = async (itemId, updateData) => {
    const response = await apiClient.put(`/inventory/items/${itemId}`, updateData);
    return response.data;
};

export const updateInventoryStock = async (itemId, newQuantity) => {
    const response = await apiClient.patch(`/inventory/items/${itemId}/stock`, { quantity: newQuantity });
    return response.data;
};

export const removeInventoryItem = async (itemId) => {
    const response = await apiClient.delete(`/inventory/items/${itemId}`);
    return response.data;
};


export const getAllInventoryItems = async () => {
    const response = await apiClient.get('/inventory/items');
    return response.data;
};

export const getInventoryItemById = async (itemId) => {
    const response = await apiClient.get(`/inventory/items/${itemId}`);
    return response.data;
};