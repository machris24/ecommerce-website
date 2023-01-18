// Import Dependencies/Modules
import { useEffect, useState, useContext } from "react";
import { Routes, Router } from "react-router-dom";

// import components
import ProductList from "../components/ProductList";
import UserContext from "../UserContext";
// import Cart from "./Cart";


export default function Products() {

    const { user } = useContext(UserContext);

    const [products, setProducts] = useState([])
   

    


        useEffect(() => {
            
            
            (user.isAdmin === true) ? 
                fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    
                    setProducts(data.map(product => {
                        console.log(product)
                        
                        return (
                                
                                <ProductList key={product._id} productProp={product}/>
                                
                        )
                    }))
            })

            :
                fetch(`${process.env.REACT_APP_API_URL}/products/`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    setProducts(data.map(product => {
                        console.log(product)
                        return (
                            
                            <ProductList key={product._id} productProp={product} />
                            
                        )
                    }))
            })
       
        }, [user.isAdmin])
        
       

    return (

        <>
            <h1 className="p-5 text-center">Products</h1>
            {products}


        </>

    )
}

