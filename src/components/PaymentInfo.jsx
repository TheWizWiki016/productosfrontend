import {
  IoCardOutline,
  IoPersonOutline,
  IoStorefrontOutline,
} from "react-icons/io5";
import { FaCcMastercard } from "react-icons/fa6";
import { BsCalendar2Date } from "react-icons/bs";
import PaymentMethodIcon from "./PaymentMethodIcon";

function PaymentInfo({ method, cardDetails, userName }) {
  return (
    <div className="space-y-4 p-4 bg-white shadow-lg py-2 rounded-md text-gray-950 text-xs">
      {method === "card" ? (
        <div className="space-y-4 p-4 bg-white shadow-lg py-2 rounded-md text-gray-950 text-xs">
          <div className="flex justify-between border-b border-gray-300">
            <span className="flex font-semibold mb-1">Tipo de pago</span>
            <span>
              <PaymentMethodIcon method={method} />
            </span>
          </div>

          <div className="flex justify-between">
            <span className="flex font-semibold mb-1">
              <IoCardOutline size={20} className="mr-2" /> Número de tarjeta:
            </span>
            <span>{cardDetails.cardNumber}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex font-semibold mb-1">
              <IoPersonOutline size={20} className="mr-2" /> Nombre:
            </span>
            <span>{cardDetails.cardName}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex font-semibold mb-1">
              <BsCalendar2Date size={20} className="mr-2" /> Fecha de Expiración
              (mm/yyyy):
            </span>
            <span>{cardDetails.expirationDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="flex font-semibold mb-1">
              <FaCcMastercard size={20} className="mr-2" /> ccv:
            </span>
            <span>{cardDetails.ccv}</span>
          </div>
        </div>
     ): method === 'pickup' ? (
    <div className="space-y-4 p-4 bg-white shadow-lg py-2 rounded-md text-gray-950 text-xs">
        
        <div className="flex justify-between">
            <span className="flex font-semibold mb-1">
                <IoStorefrontOutline size={20} className="mr-2" /> Método de entrega:
            </span>
            <span>Recoger en tienda</span>
        </div>

        <div className="flex justify-between">
            <span className="flex font-semibold mb-1">
                <IoPersonOutline size={20} className="mr-2" /> Nombre de quien recoge:
            </span>
            <span>{userName}</span>
        </div>

    </div>
) : (
    <div>
        <span>Método de pago incorrecto</span>
    </div>
)
}
</div>
  )
}

export default PaymentInfo;
