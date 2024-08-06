import React from "react";
import Product from "./Products/Products";
import Login from "./login/Login";
import Register from "./login/Register";
import Cart from "./carts/Cart";
import { Routes, Route } from "react-router-dom";

const Pages = ()=>{
    return(
        <div>
            <Routes>
                <Route path = '/' element = {<Product/>}/>
                <Route path = '/login' element = {<Login/>}/>
                <Route path = '/register' element = {<Register/>}/>
                <Route path = '/cart' element = {<Cart/>}/>
            </Routes>
        </div>

    );
}
export default Pages