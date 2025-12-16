import axios from './axiosInstance';

//Llamada para agregar un pedido
export const createOrderRequest = (order) => axios.post('/order', order);

//Llamada para actualizar el estado de una orden
export const updateStatsOrderRequest = (id, status) => axios.put('/order/' + id, status);

//Llamada para obtener todas las ordenes para el administrador
export const getOrdersRequest = () => axios.get('/order');

//Llamada al api para obtener todas las ordenes para un usuario
export const getUserOrderRequest = () => axios.get('/order/getuserorders');

//Llamada para obtener una orden por id
export const getOrderByIdRequest = (id) => axios.get('/order/' + id);

//Llamada al api para eliminar una orden
export const deleteOrderRequest = (id) => axios.delete('/order/' + id);
