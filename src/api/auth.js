import axios from "./axiosInstance";

//Request para registrar usuarios
export const registerRequest = user =>axios.post('/register', user);

//Request para iniciar sesión
export const loginRequest = user => axios.post('/login', user);

//Request para validar el Token de inicio de sesión
export const verifyTokenRequest = () => axios.get('/verify');

//Request para cerrar sesión
export const logoutRequest = () => axios.post('/logout');