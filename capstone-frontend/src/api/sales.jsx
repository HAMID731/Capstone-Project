import apiClient from './apiClient';


export const addSale = async (saleData) => {
    const response = await apiClient.post('/sales/records', saleData);
    return response.data;
};

export const updateSale = async (recordId, updateData) => {
    const response = await apiClient.put(`/sales/records/${recordId}`, updateData);
    return response.data;
};

export const deleteSale = async (recordId) => {
    const response = await apiClient.delete(`/sales/records/${recordId}`);
    return response.data;
};

export const getAllSalesRecords = async () => {
    const response = await apiClient.get('/sales/records');
    return response.data;
};

export const getSaleById = async (recordId) => {
    const response = await apiClient.get(`/sales/records/${recordId}`);
    return response.data;
};