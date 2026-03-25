import axiosClient from './axiosClient';

const userApi = {
    createUser: (data) =>
        axiosClient.post('/users', data),

    getAllUsers: (page = 0, size = 10) =>
        axiosClient.get('/users', { params: { page, size } }),

    getUserById: (id) =>
        axiosClient.get(`/users/${id}`),

    updateUser: (id, data) =>
        axiosClient.put(`/users/${id}`, data),

    deleteUser: (id) =>
        axiosClient.delete(`/users/${id}`),

    activateUser: (id) =>
        axiosClient.patch(`/users/${id}/activate`),

    deactivateUser: (id) =>
        axiosClient.patch(`/users/${id}/deactivate`),
};

export default userApi;
