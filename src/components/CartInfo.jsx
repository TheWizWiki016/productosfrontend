function CartInfo({ cart }) {
    return (
        <div className="space-y-4 p-4 bg-white shadow-lg py-2 rounded-md text-gray-950 text-xs">
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

                                <tbody className="text-gray-950 text-xs font-semibold py-1 px-1">
                                    {
                                        cart.map((product, key) => (
                                            <tr key={key} className="hover:bg-gray-100">
                                                <td>{product.quantity}</td>
                                                <td>{product.productId.name}</td>
                                                <td>{product.price}</td>
                                                <td className="text-right">
                                                    {(product.quantity * product.price).toFixed(2)}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>
                            <p className="text-center text-green-700">
                                No hay productos en el pedido
                            </p>
                        </div>
                    )
                }

            </div>
        </div>
    );
}

export default CartInfo;
