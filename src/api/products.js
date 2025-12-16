import axios from './axiosInstance';

//Llamada a la api para obtener todos los productos
export const getProductsRequest = () => axios.get('/products');

//Llamada a la api para crear un producto
export const createProductRequest = (product) => axios.post('/products', product, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});

//Llamada al api para obtener un producto por id
export const getProductRequest = (id) => axios.get('/products/' + id);

//Llamada al api para eliminar un producto por id
export const deleteProductRequest = (id) => axios.delete('/products/' + id);

//Llamada al api para editar un producto y cambiar la imagen
export const updateProductRequest = (id, product) =>
    axios.put('/products/updatewithimage' + id, product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    );

//Llamada al api para editar un producto sin cambiar la imagen
export const updateProductRequestNoUpdateImage = (id, product) => axios.put('/products/' + id, product);

//Llamada a la api para obtener todos los productos, sin importar el usuario
//para la parte pública en la compra de productos
export const getAllProductsRequest = ( ) => axios.get('/getallproducts');