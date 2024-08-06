import React from 'react'
import { MdMenu } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {Link} from 'react-router-dom'
import "./Header.css"



const Header = ()=>{
    return (
        <header>
            <div className='menu'>
                <MdMenu width={30}/>
            </div>
            <div className='logo'>
                <h1>
                    <Link to = '/'>30DaysCode</Link>
                </h1>
            </div>

            <ul>
                <li> <Link to = "/">Products</Link>  </li>
                <li> <Link to = "/login">Login or Register</Link>  </li>
                <li>  </li>
                <FaWindowClose size = {30} className='menu'/>

            </ul>
            <div className='cart-icon'>
                <span>0</span>
                <Link><FaShoppingCart size = {30}/></Link>
            </div>

        </header>
    );
}
export default Header