import { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  getProductsRequest,
  createProductRequest,
  deleteProductRequest,
  getProductRequest,
  updateProductRequestNoUpdateImage,
  updateProductRequest,
  getAllProductsRequest,
} from "../api/products";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProducts debe estar dentro de ProductContext.Provider");
  return context;
}; //Fin de useProducts

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [errors, setErrors] = useState([]);
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState({});
  const [payment, setPayment] = useState({});
  const [stepOrder, setStepOrder] = useState(1);

  //Función para obtener todos los productos de la base de datos
  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      //console.log(res);
      setProducts(res.data);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }; //Fin de getProducts

  //Función para crear un producto
  const createProduct = async (product) => {
    try {
      await createProductRequest(product);
      getProducts();
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }; //Fin de createProduct

  //Función para eliminar un producto
  const deleteProduct = async (id) => {
    try {
      await deleteProductRequest(id);
      //console.log(res.data);
      getProducts();
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }; //Fin de deleteProduct

  //Función para obtener un producto por Id
  const getProductById = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }; //Fin de getProductById

  //Función para actualizar un producto SIN CAMBIAR LA IMAGEN
  const updateProductNoUpdateImage = async (id, product) => {
    try {
      const res = await updateProductRequestNoUpdateImage(id, product);
      console.log(res);
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }; //Fin de updateProductNoUpdateImage

  //Función para actualizar un producto CON CAMBIO DE IMAGEN
  const updateProduct = async (id, product) => {
    try {
      const res = await updateProductRequest(id, product);
      return res.data;
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }; //Fin de updateProduct

  //Use effect que vacia el arreglo de errores pasados 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    } //Fin de if
  }, [errors]); //Fin de useEffect

  //Función para obtener todos los productos de la base de datos
  //para las compras
  const getAllProducts = async () => {
    try {
      const res = await getAllProductsRequest();
      setProducts(res.data);
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  }; //Fin de getAllProducts

  //Función para obtener el costo total del carrito
  const getTotalCost = () => {
    const total = cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.toSell,
      0
    );
    return total.toFixed(2);
  }; //Fin de getTotalCost

  //Funcion para avciar el carrito
  const clearCart = () => {
    setCart([]);
  }; //Fin de clearCart

  //Funcion para incrementar la cantidad de productos del carrito
  const incProduct = (idItem) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === idItem
          ? { ...cartItem, toSell: cartItem.toSell + 1 }
          : cartItem
      )
    );
  }; //Fin de incProduct

  //Funcion para decrementar la cantidad de productos del carrito
  const decProduct = (idItem) => {
    setCart((prevCart) =>
      prevCart.map((cartItem) =>
        cartItem._id === idItem && cartItem.toSell > 1
          ? { ...cartItem, toSell: cartItem.toSell - 1 }
          : cartItem
      )
    );
  }; //Fin de decProduct

  //Función para remover un item del carrito de compras
  const removeProduct = (idItem) => {
    setCart((prevCart) => prevCart.filter((product) => product._id !== idItem));
  }; //Fin de removeProduct

  //Funcion para agregar un producto al carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item._id === product._id);
      if (existingProduct) {
        //Si el producto ya esta en el carrito, incrementa su cantidad
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, toSell: item.toSell + 1 } : item
        );
      } else {
        //Si el producto no está en el carrito agregalo como un nuevo item
        return [...prevCart, { ...product, toSell: 1 }];
      }
    });
  }; //Fin de addToCart

  //Función para calcular el total de productos del carrito
  const getTotalProducts = () => {
    return cart.reduce((total, product) => total + product.toSell, 0);
  }; //Fin de getTotalProducts

  //Función para actualizar el estado de la dirección
  const updateAddress = (values) => {
    setAddress(values);
  }; //Fin de updateAddress

  //Funcion para actualizar el estado de los datos de pago
  const updatePayment = (values) => {
    setPayment(values);
  }; //Fin de updateAddress

  //Funcion para inicializar un pedido
  const initOrder = () => {
    setAddress({});
    setPayment({});
    setStepOrder(1);
  }; //Fin de initOrder

  //Funcion para actualizar el paso del estado de un pedido
  const updateStepOrder = (value) => {
    setStepOrder(value);
  }; //Fin de updateStepOrder

  //Funcion para calcular el total de impuestos 16%
  const calculateIva = (subtotal) => {
    return subtotal * 0.16;
  }; //Fin de calculateIva

  //Funcion para calcular el total (sin iva - impuestos)
  const calculateSubTotal = useMemo(() => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.toSell,
      0
    );
  }, [cart]); //Fin de calculateSubTotal

  //Funcion para calcular el total como la suma del subtotal + iva
  const calculateTotal = useMemo(() => {
    const subtotal = calculateSubTotal;
    const iva = calculateIva(subtotal);
    return subtotal + iva;
  }, [calculateSubTotal]);

  /******Fin de funciones para el carrito de compras ************/

  return (
    <ProductContext.Provider
      value={{
        products,
        getProducts,
        createProduct,
        deleteProduct,
        getProductById,
        updateProductNoUpdateImage,
        updateProduct,
        errors,
        getAllProducts,
        cart,
        getTotalCost,
        clearCart,
        incProduct,
        decProduct,
        removeProduct,
        addToCart,
        getTotalProducts,
        address,
        updateAddress,
        payment,
        updatePayment,
        initOrder,
        stepOrder,
        updateStepOrder,
        calculateIva,
        calculateSubTotal,
        calculateTotal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
} //Fin de ProductsProvider
