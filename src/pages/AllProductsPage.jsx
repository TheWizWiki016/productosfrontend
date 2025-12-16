import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

function AllProductsPage() {
    const { products, getAllProducts } = useProducts();

    //Ejecuta la funcion getProducts inmeditamente
    //despues de que se cargue el componente
    useEffect(() => {
        getAllProducts();

    }, []); //Fin de useEffect

    if (products.length === 0)
        return (<h1>No hay productos para listar</h1>)

    return (
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-2">
            {
                products.map((product) => (
                    <ProductCard product={product}
                        key={product._id}
                    />
                ))
            }
        </div>
    )
}

export default AllProductsPage