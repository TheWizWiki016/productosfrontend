import { IoCartOutline } from "react-icons/io5"
import { useProducts } from "../context/ProductContext";
import { GiConfirmed } from 'react-icons/gi';
import Tooltip from '@mui/material/Tooltip';
 

function CartResume() {
    const { cart, updateStepOrder, getTotalProducts, 
            calculateSubTotal, calculateIva, calculateTotal
     } = useProducts();
    
    //Funcion para confirmar una orden 
    const confirmOrder = ()=>{
        updateStepOrder(2);
    };//Fin de confirmOrder


    return (
        <div className='top-0 left-0 w-full h-full bg-white/10 flex
                        justify-center items-center m-3 p-3'>
            <div className='w-[80%] bg-white shadow-lg py-2 rounded-md'>
                <h2
                    className="flex justify-between items-center text-sm
                                        font-bold text-gray-950 border-b
                                        border-gray-300 py-3 px-4 md-4">
                    Resumen de Compra.
                    <IoCartOutline size={30} />
                </h2>
                <div className="flex flex-col px-4 pb-4">
                    {
                        cart.length > 0 ? (
                            <div className="flex flex-col px-4 pb-4">
                                <table>
                                    <thead>
                                        <tr className="text-gray-700 text-xs font-bold py-1 px-1 text-left">
                                            <th>Cant.</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th className="text-right">Total</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-gray-950 text-xs font-semibold py-1 px-1 text-left'>
                                        {
                                            cart.map((product) => {
                                                <tr key={product._id}
                                                    className="hover:bg-gray-100"
                                                >
                                                    <td>{product.toSell}</td>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td className='text-right'>
                                                        {(product.toSell * product.price).toFixed(2)}
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium
                                    text-gray-900">Total de productos </div>
                    <div className="flex justify-between items-center text-sm font-medium
                                    text-gray-900">
                        {getTotalProducts()}
                    </div>
                </div>
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium
                                    text-gray-900">Subtotal</div>
                    <div className="flex justify-between items-center text-sm font-medium
                                    text-gray-900">
                        ${(calculateSubTotal || 0).toFixed(2)}
                    </div>
                </div>
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
    <div className="flex justify-between items-center text-sm font-medium
                    text-gray-900">Iva (16%) </div>
    <div className="flex justify-between items-center text-sm font-medium
                    text-gray-900">
        ${calculateIva(calculateSubTotal || 0).toFixed(2)} {/* ← Cambia esta línea */}
    </div>
</div>
                <div className="border-t border-gray-300 flex justify-between items-center px-4 pt-2">
                    <div className="flex justify-between items-center text-sm font-medium
                                    text-gray-900">Total</div>
                    <div className="flex justify-between items-center text-sm font-medium
                                    text-gray-900">
                        ${(calculateTotal || 0).toFixed(2)}
                    </div>
                </div>
                                <div className="flex justify-end px-4 pt-2">
                                    <Tooltip content= "Finalizar orden" className="text-gray-700">
                                    <button className="bg-transparent hover:bg-yellow-400
                   text-yellow-500 font-semibold hover:text-white
                   py-2 px-4 border border-gray-700
                   hover:border-transparent rounded mb-2 mt-2 flex justify-center items-center"
        onClick={confirmOrder}
        >
        Confirmar <GiConfirmed className="ml-2 w-5 h-5" size={30}/>

</button>
                                    </Tooltip>
                              </div>
                            </div>
                        ) : (
                            <div>
                                <p className="text-center text-green-700">El carrito está vacío
                                    El carrito está vacío, agregue productos para poder procesar la orden
                                </p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default CartResume
