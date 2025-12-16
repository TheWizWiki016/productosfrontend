import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "../schemas/addressSchema";
import { IoPersonOutline } from "react-icons/io5";
import { FaRegAddressCard } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import Tooltip from "@mui/material/Tooltip";
import { useProducts } from "../context/ProductContext";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function AddAddress() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema)
  });

  const { updateAddress, updateStepOrder } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState();

  const onSubmit = handleSubmit((values) => {
    updateAddress(values);
    updateStepOrder(4);
  }); //Fin de onSubmit

  //Funcion para inicializar un pedido
  const reviewPayment = () => {
    updateStepOrder(2);
    return;
  }; //Fin de reviewPayment

  return (
    <div className="flex items-center justify-center w-full border-t border-gray-500 mt-4">
      <div className="bg-zinc-800 p-10 rounded-md w.full">
        <h1 className="text-2xl font-bold h-full flex items-center pb-2">
          Dirección de envío
        </h1>
        <form onSubmit={onSubmit}>
          <div>
            <div className="p-1 m-1">
              <label htmlFor="name">Nombre completo</label>
            </div>
            <div className="relative flex">
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded-lg flex-1
                                    text-gray-700 bg-white"
                placeholder="Nombre completo"
                {...register("name")}
              />
              <div
                className="absolute inset-y-0 left-0 pl-3
                                                    flex items-center text-yellow-500
                                                    pointer-events-none"
              >
                <IoPersonOutline size={20} />
              </div>
            </div>
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div>
            <div className="p-1 m-1">
              <label htmlFor="name">Dirección</label>
            </div>
            <div className="relative flex">
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded-lg flex-1
                                        text-gray-700 bg-white"
                placeholder="Dirección"
                {...register("address")}
              />
              <div
                className="absolute insert-y-0 left-0 pl-3
                                                        flex items-center text-blue-500
                                                        pointer-events-none"
              >
                <FaRegAddressCard size={20} />
              </div>
            </div>
            {errors.address && (
              <span className="text-red-500">{errors.address.message}</span>
            )}
          </div>
          <div>
            <div className="p-1 m-1">
              <label htmlFor="name">Teléfono</label>
            </div>
            <div className="relative flex">
              <input
                type="text"
                className="pl-10 pr-4 py-2 border rounded-lg flex-1
                                        text-gray-700 bg-white"
                placeholder="Teléfono"
                {...register("phone")}
              />
              <div
                className="absolute insert-y-0 left-0 pl-3
                                                        flex items-center text-blue-500
                                                        pointer-events-none"
              >
                <MdPhoneIphone size={20} />
              </div>
            </div>
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>
          <div className="flex justify-between px-4 pt-2">
            <Tooltip
              content="Metodo de pago"
              placement="left"
              className="text-gray-700"
            >
              <button
                className="bg-transparent hover:bg-yellow-700
                    text-yellow-500 font-semibold hover:text-white
                    py-2 px-4 bor5der border-gray-700
                    hover:border-transparent rounded mb-2 mt-2 flex justify-center items-center"
                onClick={reviewPayment}
                type="button"
              >
                Metodo de Pago
                <GrFormPreviousLink className="ml-2 w-5 h-5" size={30} />
              </button>
            </Tooltip>
          </div>


          <div className="flex justify-between px-4 pt-2">
            <Tooltip content="Finalizar pedido">
              <button
                className="bg-transparent hover:bg-yellow-700
                    text-yellow-500 font-semibold hover:text-white
                    py-2 px-4 bor5der border-gray-700
                    hover:border-transparent rounded mb-2 mt-2 flex "
                    onClick={()=>setIsModalOpen(true)}
                    type="button"
              >
                Finalizar Pedido
                <GrFormNextLink className="ml-2 w-5 h-5" size={30} />
              </button>
            </Tooltip>
            <ConfirmModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={onSubmit}
                title={"Confirmar Pedido"}
                text={
                  "¿Estas seguro que deseas confirmar este pedido? Esta accion no se puede deshacer"
                }
                btnAccept={"Confirmar"}
                btnCancel={"Cancelar"}
              />
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAddress;
