import { useForm, Controller } from "react-hook-form";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { useNavigate, useParams } from "react-router";
import { IoBagAdd, IoCloseSharp, IoBagCheck } from "react-icons/io5";
import { productSchema } from "../schemas/createProductSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Tooltip from "@mui/material/Tooltip";
import { toast } from "react-toastify";

function ProductsFormPage() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const inputImage = useRef(null);
  const {
    createProduct,
    getProducts,
    getProductById,
    updateProductNoUpdateImage,
    updateProduct,
    errors: productErrors,
  } = useProducts();
  const navigate = useNavigate();
  const params = useParams();
  const [updateImage, setUpdateImage] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      //console.log(params)
      if (params.id) {
        //Si existe en los params id
        //Obtenemos los datos del producto
        const product = await getProductById(params.id);

        //Asignamos los datos obtenidos del producto al formulario
        setValue("name", product.name);
        setValue("price", product.price + "");
        setValue("quantity", product.quantity + "");
        setValue("image", product.image);
        setSelectedImage(product.image);
        setIsUpdating(true);
      }
    } //Fin de loadProduct

    loadProduct();
  }, []); //Fin de useEffect

  //Funcion onSubmit para crear un nuevo producto o actualizar producto
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();

    //Agregar los datos al FormData
    formData.append("name", data.name); //Nombre del producto
    formData.append("price", data.price); //Precio del producto
    formData.append("quantity", data.quantity); //Cantidad de productos
    const imageValue = getValues("image");

    if (imageValue === undefined) {
      //No se ha seleccionado una imagen para crear o actualizar producto
      if (isUpdating)
        toast.error(
          "No se ha seleccionado una imagen para actualizar el producto"
        );
      else
        toast.error("No se ha seleccionado una imagen para el nuevo producto");
      return;
    } //Fin de data.image === undefined

    formData.append("image", imageValue);

    if (params.id) {
      //Si hay un parámetro id en la url Actualiza producvto
      if (!updateImage) {
        //Si no se cambió la imagen del producto en el formulario
        //Actualiza el producto sin actualizar la imagen
        const updateData = {
          name: data.name,
          price: parseFloat(data.price),
          quantity: parseInt(data.quantity),
          image: imageValue,
        };
        updateProductNoUpdateImage(params.id, updateData);
      } else {
        //Se cambian datos del producto y se cambia la
        //En este caso se actualiza el producto
        //Y se actualiza la imagen del Backend eliminando la
        updateProduct(params.id, formData);
      } //Fin de else updateProductWithImage
    } else {
      //Se va a crear un nuevo producto
      //Ejecutamos la llamada al api para crear productos
      createProduct(formData);
    } //Fin else(crear producto)

    await getProducts();
    navigate("/products");
  }); //Fin de onSubmit

  const handleImageClick = () => {
    inputImage.current.click();
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      field.onChange(file);
      setUpdateImage(true);
    }
  }; //Fin de handleImageChange

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bd-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-bold mb-5">
          {isUpdating ? "Actualizar Producto" : "Agregar Producto"}
        </h1>
        {productErrors.map((err, i) => (
          <div className="bg-red-500 p-2 my-2 text-white" key={i}>
            {err}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label>Nombre del producto</label>
            <input
              type="text"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Nombre del producto"
              style={{ border: errors.name ? "2px solid red" : "" }}
              {...register("name")}
              autoFocus
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className="mb-2">
            <label>Precio</label>
            <input
              type="number"
              step="0.10"
              min="0"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Precio del producto"
              {...register("price")}
            />
            {errors.price && (
              <span className="text-red-500">{errors.price.message}</span>
            )}
          </div>

          <div className="mb-2">
            <label>Cantidad</label>
            <input
              type="number"
              step="1"
              min="0"
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
              placeholder="Cantidad de productos"
              {...register("quantity")}
            />
            {errors.quantity && (
              <span className="text-red-500">{errors.quantity.message}</span>
            )}
          </div>

          <div className="py-2 my-2">
            <img
              src={selectedImage}
              alt="Imagen seleccionada"
              width={200}
              height={200}
              className="max-h-[200px] object-contain cursor-pointer"
              onClick={handleImageClick}
            />

            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  ref={inputImage}
                  onChange={(e) => handleImageChange(e, field)}
                  className="hidden"
                />
              )}
            />
          </div>
          <Tooltip title={isUpdating ? "Actualizar" : "Agregar"}>
            {isUpdating ? (
              <button
                className="bg-green-300 hover:bg-green-500
                                        text-white font-semibold hover:text-zinc-800
                                        py-2 px-4 border border-zinc-500
                                        hover:border-transparent rounded
                                        "
              >
                <IoBagCheck size={30} />
              </button>
            ) : (
              <button
                className="bg-green-300 hover:bg-green-500
                                text-white font-semibold hover:text-zinc-800
                                py-2 px-4 border border-zinc-500
                                hover:border-transparent rounded
                                "
              >
                <IoBagAdd size={30} />
              </button>
            )}
          </Tooltip>
          <Tooltip title="Cancelar">
            <button
              className="bg-red-300 hover:bg-red-700 ml-2
                            text-white font-semibold hover:text-zinc-800
                            py-2 px-4 border border-zinc-500
                            hover:border-transparent rounded
                            "
              type="button"
              onClick={() => navigate("/products")}
            >
              <IoCloseSharp size={30} />
            </button>
          </Tooltip>
        </form>
      </div>
    </div>
  );
}

export default ProductsFormPage;
