    import { FaBox, FaCheckCircle, FaTimesCircle, FaTruck } from 'react-icons/fa';

function OrderStatus({ status, showLabel }) {

    // Objeto de mapeo para los íconos y colores
    const statusConfig = {
        received: {
            icon: FaBox,
            color: 'text-blue-500',
            label: 'Recibido'
        },
        confirmed: {
            icon: FaCheckCircle,
            color: 'text-green-500',
            label: 'Confirmado'
        },
        cancelled: {
            icon: FaTimesCircle,
            color: 'text-red-500',
            label: 'Cancelado'
        },
        delivered: {
            icon: FaTruck,
            color: 'text-purple-500',
            label: 'Entregado'
        }
    };
const config = statusConfig[status];

return (
    <span className='inline-flex items-center'>
        <config.icon size={20} className={`${config.color} mr-1`} />
        { showLabel && <span>{config.label}</span>}
    </span>
);
}
    

export default OrderStatus;
