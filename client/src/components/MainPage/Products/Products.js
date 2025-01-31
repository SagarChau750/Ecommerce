import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductList from "../utils/ProductLists/ProductList";

const Product = ()=>{
    const state = useContext(GlobalState);

    const [products] = state.productsAPI.products
    return(
        <div className="products">
            {
                products.map((product) => {
                    return <ProductList key = {product.id} product = {product}/>
                })
            }
            
        </div>

    );
}
export default Product