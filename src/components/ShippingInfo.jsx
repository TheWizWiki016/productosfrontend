import { IoPersonOutline } from 'react-icons/io5';
import { FaRegAddressCard } from 'react-icons/fa';
import { MdPhoneIphone } from 'react-icons/md';

function ShippingInfo({ name, address, phone }) {

    return (
        <div className="space-y-4 p-4 bg-white shadow-lg py-2 rounded-md text-gray-950 text-xs">

            <div className="flex justify-between">
                <span className="flex font-semibold mb-1">
                    <IoPersonOutline size={20} className="mr-2" /> Nombre:
                </span>
                <span>{name}</span>
            </div>

            <div className="flex justify-between">
                <span className="flex font-semibold mb-1">
                    <FaRegAddressCard size={20} className="mr-2" /> Dirección:
                </span>
                <span>{address}</span>
            </div>

            <div className="flex justify-between">
                <span className="flex font-semibold mb-1">
                    <MdPhoneIphone size={20} className="mr-2" /> Teléfono:
                </span>
                <span>{phone}</span>
            </div>

        </div>
    );
}

export default ShippingInfo;
