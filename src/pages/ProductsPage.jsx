import { useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";


function ProductsPage() {
    const { products, getProducts } = useProducts();

    console.log(products);

    //Ejecuta la funcion getProducts inmeditamente
    //despues de que se cargue el componente
    useEffect(() => {
        getProducts();

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

export default ProductsPage