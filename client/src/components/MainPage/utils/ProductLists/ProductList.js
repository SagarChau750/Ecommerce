import React from "react";
import { Link } from "react-router-dom";

const ProductList = ({product})=>{
    console.log(product);
    return (
        <div className="product-card">
            <img src = {product.images.ul} alt="/"/>
            <div className="product-box">
                <h2>title :{product.title} </h2>
                <span>${product.price} </span>
                <p>${product.description} </p>
            </div>

            <div className="row-btn">
                <Link id = '#btn_buy' to= {`#!`}>Buy</Link>
                <Link id = '#btn_viewd' to ={`detail/${product._id}`}>View</Link>

            </div>

        </div>
    )
}

export default ProductList