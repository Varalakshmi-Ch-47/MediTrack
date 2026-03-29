import axios from "axios";

const API = "http://localhost:5000/api/auth";

export const registerpatient = (data) =>
  axios.post(`${API}/patient/register`, data);

export const loginPatient = (data) =>
  axios.post(`${API}/patient/login`, data);

export const registerDoctor = (data) =>
  axios.post(`${API}/doctor/register`, data);

export const loginDoctor = (data) =>
  axios.post(`${API}/doctor/login`, data);

export const loginAdmin = (data) =>
  axios.post(`${API}/admin/login`, data);