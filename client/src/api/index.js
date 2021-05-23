import axios from 'axios';

const url = 'http://localhost:5000/api';

export const fetchPatients=(config)=>axios.get(`${url}/patients`,config);
export const deletePatient=(id,config)=>axios.delete(`${url}/patients/${id}`,config);
export const addPatient=(patient,config)=>axios.post(`${url}/patients/create`,patient,config);
export const updatePatient=(id,patient,config)=>axios.put(`${url}/patients/update/${id}`,patient,config);
export const loginUser=(user,config)=>axios.post(`${url}/clients/login`,user,config);
export const registerUser=(user,config)=>axios.post(`${url}/clients/register`,user,config);
export const getUser=(config)=>axios.get(`${url}/clients`,config);
