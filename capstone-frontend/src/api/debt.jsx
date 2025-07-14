import apiClient from './apiClient';


export const addDebt = async (debtData) => {
    const response = await apiClient.post('/debt/records', debtData);
    return response.data;
};


export const updateDebt = async (debtId, updateData) => {
    const response = await apiClient.put(`/debt/records/${debtId}`, updateData);
    return response.data;
};

export const deleteDebt = async (debtId) => {
    const response = await apiClient.delete(`/debt/records/${debtId}`);
    return response.data;
};

export const getAllDebtRecords = async () => {
    const response = await apiClient.get('/debt/records');
    return response.data;
};

export const getDebtById = async (debtId) => {
    const response = await apiClient.get(`/debt/records/${debtId}`);
    return response.data;
};