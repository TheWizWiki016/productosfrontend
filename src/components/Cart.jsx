import {
  IoBagCheckOutline,
  IoCartOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import { useNavigate } from "react-router";
import { useProducts } from "../context/ProductContext";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";

function Cart() {
  const {
    cart,
    incProduct,
    decProduct,
    removeProduct,
    getTotalProducts,
    calculateSubTotal,
    calculateIva,
    calculateTotal,
    updateStepOrder,
  } = useProducts();
  const navigate = useNavigate();

  const handleProcess = () => {
    updateStepOrder(1);
    navigate("/sale");
  };

  //Función para incrementar la cantidad de productos del carrito
  const incrementProduct = (product) => {
    const existingProduct = cart.find(
      (cartItem) => cartItem._id === product._id
    );

    if (existingProduct.toSell == existingProduct.quantity) {
      //Ya existe el producto en el carrito, validamos que
      //no se exceda del maximo stock
      toast.warn(
        "Ha alcanzado el maximo de " +
          existingProduct.quantity +
          " productos en stock"
      );
      return;
    } else {
      //Si no ha alcanzado el maximo se incrementa la cantidad
      incProduct(product._id);
      toast.success("Producto agregado al carrito");
    } //Fin de else
  }; //Fin de incrementProduct

  //Funcion para decrementar la cantidad de productos en el carrito
  const decrementProduct = (product) => {
    const existingProduct = cart.find(
      (cartItem) => cartItem._id === product._id
    );

    if (existingProduct.toSell > 1) {
      //Ya existe el producto en el carrito, validamos que
      //se piueda decrementar
      decProduct(product._id);
    } else {
      //Se elimina el producto
      removeProduct(product._id);
    } //Fin de else
    toast.warn("Producto eliminado del carrito");
  }; //Fin de incrementProduct

  return (
    <div
      className="top-0 left-0 w-full h-full bg-white/10 flex
                        justify-center items-center m-3 p-3"
    >
      <div className="w-2/5 bg-white shadow-lg py-2 rounded-md">
        <h2
          className="flex justify-between items-center text-sm
                                        font-bold text-gray-950 border-b
                                        border-gray-300 py-3 px-4 md-4"
        >
          Carrito de Compras.
          <IoCartOutline size={30} />
        </h2>
        <div className="flex flex-col px-4 pb-4">
          {cart.length > 0 ? (
            <table>
              <thead>
                <tr className="text-gray-700 text-xs font-bold py-1 px-1 text-left">
                  <th>Cant.</th>
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th className="text-right">Total</th>
                  <th className="text-right">Opc.</th>
                </tr>
              </thead>
              <tbody className="text-gray-950 text-xs font-semibold py-1 px-1 text-left">
                {cart.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-100">
                    <td>
                      <span
                        className="m-1 text-sm font-bold text-red-500"
                        onClick={() => decrementProduct(product)}
                      >
                        -
                      </span>
                      {product.toSell}
                      <span
                        className="m-1 text-sm font-bold text-green-500"
                        onClick={() => incrementProduct(product)}
                      >
                        +
                      </span>
                    </td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td className="text-right">
                      {(product.toSell * product.price).toFixed(2)}
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end">
                        <button
                          className="m-1 p-1 text-sm font-bold text-yellow-500 text-right"
                          onClick={() => {
                            removeProduct(product._id);
                            toast.warn("Producto eliminado del carrito");
                          }}
                        >
                          <IoTrashBinOutline size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div>
              <p className="text-center text-green-700">
                El carrito está vacío
              </p>
            </div>
          )}
        </div>
        <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
          <div
            className="flex justify-between items-center text-sm font-medium
                                    text-gray-900"
          >
            Total de productos{" "}
          </div>
          <div
            className="flex justify-between items-center text-sm font-medium
                                    text-gray-900"
          >
            {getTotalProducts()}
          </div>
        </div>
        <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
          <div
            className="flex justify-between items-center text-sm font-medium
                                    text-gray-900"
          >
            Subtotal
          </div>
          <div
            className="flex justify-between items-center text-sm font-medium
                                    text-gray-900"
          >
            ${(calculateSubTotal || 0).toFixed(2)}
          </div>
        </div>
        <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
          <div
            className="flex justify-between items-center text-sm font-medium
                    text-gray-900"
          >
            Iva (16%){" "}
          </div>
          <div
            className="flex justify-between items-center text-sm font-medium
                    text-gray-900"
          >
            ${calculateIva(calculateSubTotal || 0).toFixed(2)}{" "}
            {/* ← Cambia esta línea */}
          </div>
        </div>
        <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
          <div
            className="flex justify-between items-center text-sm font-medium
                                    text-gray-900"
          >
            Total
          </div>
          <div
            className="flex justify-between items-center text-sm font-medium
                                    text-gray-900"
          >
            ${(calculateTotal || 0).toFixed(2)}
          </div>
        </div>
        <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
          <Tooltip content="Procesar">
            <button
              type="button"
              className={` flex justify-center items-center text-white px-4 py-2 rounded-lg text-sm
                        ${
                          getTotalProducts() === 0
                            ? "pointer-events-none bg-green-100 hover:bg-green-200"
                            : "bg-green-500 hover_bg-green-600"
                        }
                `}
              onClick={() => handleProcess()}
            >
              Procesar <IoBagCheckOutline className="ml-2" size={30} />
            </button>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Cart;
