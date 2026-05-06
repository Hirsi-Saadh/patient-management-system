import axios from "axios";

const API = `${import.meta.env.VITE_BACKEND_URL}/patient`;

export const getPatients = () => axios.get(API);
export const createPatient = (data) => axios.post(API, data);
export const updatePatient = (id, data) => axios.put(`${API}/${id}`, data);
export const deletePatient = (id) => axios.delete(`${API}/${id}`);