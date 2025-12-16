import { IoWarning } from "react-icons/io5";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  text,
  btnCancel,
  btnAccept,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Fondo oscuro */}
      <div
        className=" fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClose={onClose}
      ></div>
      {/* Contenedor del modal */}

      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div
          className="relative w-[20vw] min-w-[280] max-w-[400px]
            transform-overflow-hidden rounded-xl bg-white text-left
                            shadow-2xl transition-all duration-300 ease-out"
        >
          {/* Contenido del modal */}
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              {/*Icono de advertencias*/}
              <div
                className="mx-auto flex h-12 w-12 shrink-0 items-center justify-center
                                 rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10"
              >
                <IoWarning className="h-6 w-6 text-yellow-600 " size={30} />
              </div>

              {/* Texto modal */}
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{text}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones del modal */}
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              onClick={onConfirm}
              className="inline-flex w-full justify-center rounded-md bg-green-600
                               px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500
                               sm:ml-3 sm:w-auto"
            >
              {btnAccept}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600
                               py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset
                               ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              {btnCancel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
