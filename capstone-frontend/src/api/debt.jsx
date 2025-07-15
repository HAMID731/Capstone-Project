import apiClient from './apiClient';

export const addDebt = async (debtData) => {
    const response = await apiClient.post('/debts', debtData);
    return response.data.data;
};

export const updateDebt = async (debtId, updateData) => {
    const response = await apiClient.put(`/debts/${debtId}`, updateData);
    return response.data;
};

export const deleteDebt = async (debtId) => {
    const response = await apiClient.delete(`/debts/${debtId}`);
    return response.data;
};

export const getAllDebtRecords = async () => {
    const response = await apiClient.get('/debts');
    return response.data;
};

export const getDebtById = async (debtId) => {
    const response = await apiClient.get(`/debts/${debtId}`);
    return response.data;
};