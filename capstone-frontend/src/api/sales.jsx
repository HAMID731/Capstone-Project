import apiClient from './apiClient';

export const addSale = async (saleData) => {
    const response = await apiClient.post('/sales', saleData);
    return response.data.data;
};

export const updateSale = async (recordId, updateData) => {
    const response = await apiClient.put(`/sales/${recordId}`, updateData);
    return response.data;
};

export const deleteSale = async (recordId) => {
    const response = await apiClient.delete(`/sales/${recordId}`);
    return response.data;
};

export const getAllSalesRecords = async () => {
    const response = await apiClient.get('/sales');
    return response.data;
};

export const getSaleById = async (recordId) => {
    const response = await apiClient.get(`/sales/${recordId}`);
    return response.data;
};
