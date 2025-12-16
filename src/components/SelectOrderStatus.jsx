import OrderStatus from './OrderStatus';
import { useState, useEffect } from 'react';

function SelectOrderStatus({status, onChange}) {
  const [selectedStatus , setSelectedStatus] = useState(status);
  const selectOptions = [
    { label: 'Recibido', value: 'received' },
    { label: 'Confirmado', value: 'confirmed' },
    { label: 'Cancelado', value: 'cancelled' },
    { label: 'Entregado', value: 'delivered' },
  ]

  useEffect(() => {
    if (selectedStatus !== status) {
      onChange(selectedStatus);
    }
  },[selectedStatus, status, onChange]);

  //Si el estado es cancelled deshabilitaremos el select
  const isDisabled = status === 'cancelled';

  return (
  <div className="relative flex select text-xs">
    <div className="flex items-center space-x-3 mb-4">
      <select
        value={selectedStatus}
        disabled={isDisabled}
        onChange={(e) => setSelectedStatus(e.target.value)}
        className="flex-1 py-1 bg-transparent focus:outline-none"
      >
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <OrderStatus status={selectedStatus} showLabel={false} />
    </div>
  </div>
)

}

export default SelectOrderStatus
