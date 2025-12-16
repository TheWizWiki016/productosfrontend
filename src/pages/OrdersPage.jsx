import OrderCard from '../components/OrderCard';
import { useEffect } from 'react';
import { useOrders } from '../context/OrderContext';

function OrdersPage() {
    const { getOrders, orders } = useOrders();

    useEffect(() => {
        getOrders();
    }, []);

    if (orders.length === 0)
        return (<h1>No hay ordenes para listar</h1>)

    return (
        <div className='grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2'>
            {
                orders.map((order) => (
                   <OrderCard 
                   order={order} 
                   key={order._id} />
                ))
            }
        </div>
    )
}

export default OrdersPage;
