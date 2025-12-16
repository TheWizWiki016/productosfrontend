import React from "react";
import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "../schemas/paymentSchema";
import { IoCarOutline, IoPersonOutline } from "react-icons/io5";
import { BsCalendar2Date } from "react-icons/bs";
import { FaCcMastercard } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function AddPayment() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    trigger,
  } = useForm({
    resolver: zodResolver(paymentSchema),
  });

  const { updatePayment, updateStepOrder } = useProducts();
  const { user } = useAuth();
  const [paymentType, setPaymenType] = useState("pickup");
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Observar metodo de pago para detectar cambios
  const paymentMethod = watch("paymentMethod");
  const cardNumber = watch("cardNumber");
  const expirationDate = watch("expirationDate");
  const ccv = watch("ccv");

  const handlePaymentMethodChange = (method) => {
    if (method === "card") {
      setValue("paymentMethod", "card");
      setPaymenType("card");
    } else {
      setValue("paymentMethod", "pickup");
      setPaymenType("pickup");
    }
  }; //Fin de handlePaymentMethodChange

  //Funcion para guardar los datos del pago al hacer click en el boton
  const onSubmit = (data) => {
    if (paymentType === "card") {
     updatePayment({
       paymentMethod,
       cardDetails: {
        cardName: data.cardName,
        cardNumber: data.cardNumber,
        expirationDate: data.expirationDate,
        ccv: data.ccv,
       },
     });
     updateStepOrder(3);
    } else {
      updatePayment({
         paymentMethod,
        userName: data.userName
      });
    updateStepOrder(4);
     }
  }; //Fin de onSubmit

  const reviewConfirm = () => {
    updateStepOrder(1);
  }; //Fin de reviewOrder

  //Funcion para formato de la tarjeta quitando espacios y aceptando solamente digitos
  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const groups = digits.match(/.{1,4}/g);
    return groups ? groups.join(" ").slice(0, 19) : "";
  }; //Fin de formatCardNumber

  //Funcion para convertir la fecha en formato mm/yy
  const handleDateChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 4);
    const formatted =
      val.length >= 3 ? val.slice(0, 2) + "/" + val.slice(2) : val;
    setValue("expirationDate", formatted);
    trigger("expirationDate");
  }; //Fin de handleDateChange

  //Funcion para controlar el cambio de numero de tarjeta y validarlo
  //Ademas de usar la funcion formatCardNumber para separar
  //los caracteres en grupos de 4
  const handleCardNumberChange = (e) => {
    const inputValue = e.target.value;

    const formatted = formatCardNumber(inputValue);
    setValue("cardNumber", formatted);

    const cleanValue = formatted.replace(/\s/g, "");
    setValue("cardNumberClean", cleanValue);
    trigger("cardNumber");
  }; //Fin de handleCardNumberChange

  return (
    <div className="w-full border-t border-gray-500 mt-4">
      <div className="bg-zinc-800 p-5 rounded-md w-full pb-2">
        <h1 className="text-2xl font-bold h-full items-center pb-2 ml-4">
          Metodo de pago
        </h1>
      </div>
      <div className="flex justify-around bg-zinc-800 rounded-md w-full">
        {/* Radio Button para recoger en tienda */}
        <div className="flex items-center flex-row">
          <input
            id="pickup"
            type="radio"
            value="pickup"
            {...register("paymentMethod")}
            checked={paymentMethod === "pickup"}
            onClick={() => handlePaymentMethodChange("pickup")}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <div className="p-1 m-1">
            <label htmlFor="pickup" className="text-white">
              Recoger en tienda
            </label>
          </div>
        </div>
        {/* Fin de recoger en tienda */}

        {/* Radio Button para pago con tarjeta */}
        <div className="flex items-center">
          <input
            id="card"
            type="radio"
            value="card"
            {...register("paymentMethod")}
            onClick={() => handlePaymentMethodChange("card")}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          <div className="p-1 m-1">
            <label htmlFor="card" className="text-white">
              Pago con tarjeta
            </label>
          </div>

          {/* Fin de pago con tarjeta */}
        </div>

        {/* Formulario para datos de la tarjeta */}
        {paymentType === "card" && (
          <div>
            <h1 className="text-2x1 font-bold items-center">
              Datos de la tarjeta
            </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Numero de tarjeta */}
            <div className="text-sm font-medium text-gray-100">
              <label htmlFor="cardNumber">Numero de tarjeta</label>
            </div>
            <div className="relative flex">
              <input
                type="text"
                {...register("cardNumber")}
                className="pl-10 pr-4 py-2 border rounded-lg flex-1 text-gray-700 bg-white"
                placeholder="123 5678 9012 3456"
                onChange={handleCardNumberChange}
                value={cardNumber}
              />
              <div
                className="absolute inset-y-0 left-0 pl-3 pointer-events-none
                          flex items-center text-yellow-500"
              >
                <IoCarOutline size={20} />
              </div>
            </div>
            {errors?.cardNumber && (
              <div className="text-red-500 flex justify-items-end text-end mb-2 pb-2">
                {errors.cardNumber.message}
              </div>
            )}

            {/* Nombre en la tarjeta */}
            <div className="text-sm font-medium text-gray-100">
              <label htmlFor="cardNumber">Nombre en la tarjeta</label>
            </div>
            <div className="relative flex">
              <input
                type="text"
                {...register("cardName")}
                className="pl-10 pr-4 py-2 border rounded-lg flex-1 text-gray-700 bg-white"
                placeholder="Juanito Alcachofas"
              />
              <div
                className="absolute inset-y-0 left-0 pl-3 pointer-events-none
                          flex items-center text-green-500"
              >
                <IoPersonOutline size={20} />
              </div>
            </div>
            {errors?.cardName && (
              <div className="text-red-500 flex justify-items-end text-end mb-2 pb-2">
                {errors.cardName.message}
              </div>
            )}

            {/* Fecha de expiracion */}
            <div className="text-sm font-medium text-gray-100">
              <label htmlFor="expirationDate">
                Fecha de expiracion (mm/aa)
              </label>
            </div>
            <div className="relative flex">
              <input
                value={expirationDate}
                type="text"
                {...register("expirationDate")}
                className="pl-10 pr-4 py-2 border rounded-lg flex-1 text-gray-700 bg-white"
                placeholder="mm/aa"
                onChange={handleDateChange}
                onBlur={() => trigger("expirationDate")}
                maxLength={5}
              />
              <div
                className="absolute inset-y-0 left-0 pl-3 pointer-events-none
                          flex items-center text-blue-500"
              >
                <BsCalendar2Date size={20} />
              </div>
            </div>
            {errors?.expirationDate && (
              <div className="text-red-500 flex justify-items-end text-end mb-2 pb-2">
                {errors.expirationDate.message}
              </div>
            )}

            {/* CCV de la tarjeta  */}
            <div className="text-sm font-medium text-gray-100">
              <label htmlFor="ccv">CCV</label>
            </div>
            <div className="relative flex">
              <input
                type="text"
                maxLength={3}
                {...register("ccv")}
                className="pl-10 pr-4 py-2 border rounded-lg flex-1 text-gray-700 bg-white"
                placeholder="123"
                value={ccv}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 3);
                  setValue("ccv", val);
                  trigger("ccv");
                }}
              />
              <div
                className="absolute inset-y-0 left-0 pl-3 pointer-events-none
                          flex items-center text-orange-500"
              >
                <FaCcMastercard size={20} />
              </div>
            </div>
            {errors?.ccv && (
              <div className="text-red-500 flex justify-items-end text-end mb-2 pb-2">
                {errors.ccv.message}
              </div>
            )}
          </form>
          </div>
        )}

        {/* Fin de formulario para datos con tarjeta */}

        {/* Formulario para recoger en tienda */}
        {paymentType === "pickup" && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            {/* Nombre del cliente */}
            <div className="text-sm font-medium text-gray-100">
              <label htmlFor="userName">Nombre del cliente</label>
            </div>
            <div className="relative flex">
              <input
                value={user.username}
                type="text"
                {...register("userName")}
                className="pl-10 pr-4 py-2 border rounded-lg flex-1 text-gray-700 bg-white"
                placeholder="Nombre del cliente"
              />
              <div
                className="absolute inset-y-0 left-0 pl-3 pointer-events-none
                          flex items-center text-green-500"
              >
                <IoPersonOutline size={20} />
              </div>
            </div>
            {errors?.userName && (
              <div className="text-red-500 flex justify-items-end text-end mb-2 pb-2">
                {errors.cardUser.message}
              </div>
            )}
          </form>
        )}
      </div>
      <div className="bg-zinc-800 p-5 rounded-md w-full pb-2 flex justify-between">
        <Tooltip
          content="Revisar Orden"
          placement="left"
          className="text-gray-700"
        >
          <button
            className="bg-transparent hover:bg-lime-700
                   text-lime-500 font-semibold hover:text-white
                   py-2 px-4 border border-gray-700
                   hover:border-transparent rounded mb-2 mt-2 flex justify-center items-center"
            onClick={reviewConfirm}
            type="button"
          >
            Revisar Orden
            <GrFormPreviousLink className="mr-2 w-5 h-5" size={30} />
          </button>
        </Tooltip>

        <Tooltip content={
          paymentType === "pickup"
          ? "Finalizar la orden"
          : "Agregar direccion"
         } >
          <button
            className="bg-transparent hover:bg-lime-700
                   text-lime-500 font-semibold hover:text-white
                   py-2 px-4 border border-gray-700
                   hover:border-transparent rounded mb-2 mt-2 flex"
            type="submit"
            onClick={() =>{
              if (paymentType === "pickup") {
                setIsModalOpen(true);
              }else{
                handleSubmit(onSubmit)();
              }
            }}
          >
            {
              paymentType === "pickup" ? "Finalizar Pedido" : "Agregar Direccion"
            }
            <GrFormNextLink className="ml-2 w-5 h-5" size={30} />
          </button>
        </Tooltip>
        <ConfirmModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleSubmit(onSubmit)()}
          title={"Confirmar Pedido"}
          text={
            "¿Estas seguro que deseas confirmar este pedido? Esta accion no se puede deshacer"
          }
          btnAccept={"Confirmar"}
          btnCancel={"Cancelar"}
        />
      </div>
    </div>
  );
}

export default AddPayment;
