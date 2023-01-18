import { Link, Navigate, Route, useParams, Routes } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Button, Card, Col, Container, Modal, Row, Form } from "react-bootstrap";
// import ProductTable from "./ProductTable";
import UserContext from "../UserContext";

import './ProductList.css'
import Swal from "sweetalert2";
// import Cart from "../pages/Cart"





export default function ProductList ({productProp}) {

    console.log(productProp)
    
    const [cartItems, setCartItems] = useState([])
    console.log(cartItems)

    

    const { user } = useContext(UserContext);

    const [name, setName] = useState(productProp.name);
    const [description, setDescription] = useState(productProp.description);
    const [price, setPrice] = useState(productProp.price);
    const [stocks, setStocks] = useState(productProp.stocks);
    const [category, setCategory] = useState(productProp.category);
    const [isActive, setIsActive] = useState(productProp.isActive);
    const [quantity, setQuantity] = useState('');


    console.log(productProp)
    console.log(name)
    console.log(description)
    console.log(price)
    console.log(stocks)
    console.log(category)
    console.log(isActive)

    const { _id } = useParams();
    console.log(_id)
    // const navigate = Navigate();


    // Object destructuring
    // const { name, description, price, stocks, category, isActive, createdOn, orderCart, _id } = productProp;
    

    const [showEdit, setShowEdit] = useState(false);
    const [ isShowing, setIsShowing ] = useState(false);
    const [ showingCart, setIsShowingCart ] = useState(false);
    

    const closeDetails = () => setIsShowing(false);
    const closeCart = () => setIsShowingCart(false);


    const retrieve = (id) => {

        setIsShowing(true);
        
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)

            setName(data.name);
            setDescription(data.description);
            setPrice(data.price);
            setStocks(data.stocks);
            setCategory(data.category);

            
        })
    }

    const deactivate = (id) => {
        
        fetch(`${process.env.REACT_APP_API_URL}/products/archive/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data === true) {
                
                setIsActive(false);

                Swal.fire({
                    title: "Product Deactivated",
                    icon: "success",
                    text: "You have successfully deactivated this product."
                })

                // navigate("/admin");

            } else {

                Swal.fire({
                    title: "Soumething went wrong.",
                    icon: "error",
                    text: "Please try again."
                })
            }
            
        })
    }

    const activate = (id) => {
        
        fetch(`${process.env.REACT_APP_API_URL}/products/activate/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)

            if(data === true) {

                setIsActive(true);
    
                Swal.fire({
                    title: "Product Published",
                    icon: "success",
                    text: "You have successfully published this product."
                })

                // navigate("/admin");

            } else {

                Swal.fire({
                    title: "Soumething went wrong.",
                    icon: "error",
                    text: "Please try again."
                })
            }
            
        })
    }

    const update = (id) => {

        console.log(id)
        fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                name: name,
                description: description,
                price: price,
                stocks: stocks,
                category:category
            })
        })
        .then(res => res.json())
            .then(data => {
                console.log(data)

                if(data === true) {
    
                    Swal.fire({
                        title: "Product Updated",
                        icon: "success",
                        text: "You have successfully edited this product."
                    })

                    // navigate("/admin");

                } else {
    
                    Swal.fire({
                        title: "Soumething went wrong.",
                        icon: "error",
                        text: "Please try again."
                    })
                }
                
        })
    }

    const handleAddToCart =(prod) => {

        console.log(prod)
        setIsShowingCart(true);

        // Check if the product exists in the cart
        const ProductExist = cartItems.find((item) => item._id === prod._id);
        

        if(ProductExist) {
            // if already exists, display the existing product and increase the quantity + 1
            setCartItems(cartItems.map((item) => 
                item._id === prod._id ?
                    {...ProductExist, quantity: ProductExist.quantity + 1}
                    : 
                    item
                    ))
        } else {
            setCartItems([...cartItems, {...prod, quantity: 1} ]);
        }

        console.log(cartItems)
    }




        // Checkout Function

        const checkout =(id, quant) => {

            fetch(`${process.env.REACT_APP_API_URL}/orders/orderProducts`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    productId: id,
                    quantity: quant
                })
            })
            .then(res => res.json())
                .then(data => {
                    console.log(data)
    
                    if(data === true) {

                        setCartItems([]);
            
                        Swal.fire({
                            title: "Checked Out",
                            icon: "success",
                            text: "Thanks for your purchase."
                        })
        
                        // navigate("/admin");
        
                    } else {
        
                        Swal.fire({
                            title: "Soumething went wrong.",
                            icon: "error",
                            text: "Please try again."
                        })
                    }
                })
    
                
        }

        // Update Order Quantity
        const updateQuantity = (id, value) => {
            
			let updatedCart = cartItems.map(item => item.id === id ? item.quantity += value : item)
            setQuantity(updatedCart)
	    };

    useEffect(() => {
        if(isActive === false) {
            setIsActive(false)
        }
    },[isActive])

    
    
    
    

    return (
        <>
            {/* <ProductTable /> */}
            <Container className="card-wrapper p-4">
                <Row>
                    <Col xs={12}>
                        <div className="products">
                            <Card className="productCard" border="warning">
                            
                            <Card.Body key={productProp._id}>
                                <Card.Title className="p-2 text-center">{productProp.name}</Card.Title>
                                <Card.Subtitle>Description:</Card.Subtitle>
                                <Card.Text>{productProp.description}</Card.Text> 
                                <Card.Subtitle>Price:</Card.Subtitle>
                                <Card.Text>Php {productProp.price}</Card.Text>
                                <Card.Subtitle>Stocks:</Card.Subtitle>
                                <Card.Text>{productProp.stocks}</Card.Text>
                                <Card.Subtitle>Category:</Card.Subtitle>
                                <Card.Text>{productProp.category}</Card.Text> 

                                {
                                    user.isAdmin === true ?
                                        <>
                                        
                                        <Card.Subtitle>Created On:</Card.Subtitle>
                                        <Card.Text>{productProp.createdOn}</Card.Text>
                                        {/* <Card.Subtitle>Orders:</Card.Subtitle>
                                        <Card.Text>{productProp.orderCart}</Card.Text> */}
                                        <Card.Subtitle>Availability:</Card.Subtitle>
                                        {
                                            isActive  ?
                                                <>
                                                <Card.Text>Active</Card.Text>
                                                <Button className="m-1" variant="danger" onClick={() => 
                                                deactivate(productProp._id)}>Disable</Button>
                                                </>
                                                :
                                                <>
                                                <Card.Text>Deactivated</Card.Text>
                                                <Button className="m-1" variant="success" onClick={() => 
                                                activate(productProp._id)}>Enable</Button>
                                                </>
                                                
                                        }
                                        
                                        <Button className="m-1" variant="warning"  onClick={() => 
                                                setShowEdit(true)}>Update</Button>

                                        
                                        </>
                                    :
                                        <Button className="m-1" variant="primary"  disabled={showingCart} onClick={() => handleAddToCart(productProp)}>Add To Cart</Button>
                                }
                                <Button className="m-1" variant="primary"  disabled={isShowing} onClick={() => retrieve(productProp._id)}>Details</Button>
                                
                                
                            </Card.Body>
                            
                            </Card>
                        </div>
                        
                    </Col>
                
                    
                </Row>
                { 
                    showEdit ?
                    
                    <Container>
                    <Form>
                    <h1 className="mb-3 text-center">Update Product</h1>
                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                        <Form.Label>Product Name</Form.Label> 
                        <Form.Control 
                            type="text" 
                            placeholder={productProp.name}
                            value={name}
                            onChange={e => setName(e.target.value)}
                            />
                        </span>
                    </Form.Group>
                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                        <Form.Label>Description</Form.Label> 
                        <Form.Control 
                            type="text" 
                            placeholder={productProp.description}
                            value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </span>
                    </Form.Group>
                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                        <Form.Label>Price</Form.Label> 
                        <Form.Control 
                            type="number" 
                            placeholder={productProp.price}
                            value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </span>
                    </Form.Group>
                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                        <Form.Label>Stocks</Form.Label> 
                        <Form.Control 
                            type="text" 
                            placeholder={productProp.stocks}
                            value={stocks}
                                onChange={e => setStocks(e.target.value)}
                            />
                        </span>
                    </Form.Group>
                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                        <Form.Label>Category</Form.Label> 
                        <Form.Control 
                            type="text" 
                            placeholder={productProp.category}
                            value={category}
                                onChange={e => setCategory(e.target.value)}
                            />
                        </span>
                    </Form.Group>
                    
                            <Button className="m-2" type="submit" onClick={() => 
                                        update(productProp._id)}>Update</Button>
                            <Button className="m-2" type="submit" onClick={() => 
                                                setShowEdit(false)}>Cancel</Button>
                </Form>
                    </Container>
                    :
                    null  
                }   

                 <Modal show={isShowing} onHide={closeDetails} centered fullscreen='lg-down'>
                    <Modal.Header closeButton>
                    <Card.Title>{name}</Card.Title>
                    </Modal.Header>
                    <Modal.Body>
                               
                               <Card.Subtitle>Description:</Card.Subtitle>
                               <Card.Text>{description}</Card.Text> 
                               <Card.Subtitle>Price:</Card.Subtitle>
                               <Card.Text>Php {price}</Card.Text>
                               <Card.Subtitle>Stocks:</Card.Subtitle>
                               <Card.Text>{stocks}</Card.Text>
                               <Card.Subtitle>Category:</Card.Subtitle>
                               <Card.Text>{category}</Card.Text>
                               </Modal.Body>

                    <Modal.Footer>
                    
                    
                    {
                        user.isAdmin === true ?
                            <Button variant="secondary" onClick={closeDetails}>
                                Close
                            </Button>
                            :
                            <>
                            <Button variant="primary" disabled={showingCart} onClick={() => handleAddToCart(productProp)}>
                            Add To Cart
                            </Button>
                            <Button variant="secondary" onClick={closeDetails}>
                                Cancel
                            </Button>
                            </>
                    }
                    </Modal.Footer>
                </Modal>      

                <Modal show={showingCart} fullscreen ={true} onHide={closeCart}>
                    <Modal.Header closeButton>
                    <Modal.Title>Cart Items</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    {
                        cartItems.length === 0 ?
                            <div className="cart-items-empty"> No items are added</div>
                            :  
                            null
                    }
                    {
                        cartItems.map((item) => (
                        <div key={item._id} className="cart-items-list">
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Subtitle>Description:</Card.Subtitle>
                               <Card.Text>{item.description}</Card.Text> 
                               <Card.Subtitle>Price:</Card.Subtitle>
                               <Card.Text>Php {item.price}</Card.Text>
                               <Card.Subtitle>Stocks:</Card.Subtitle>
                               <Card.Text>{item.stocks}</Card.Text>
                               <Card.Subtitle>Category:</Card.Subtitle>
                               <Card.Text>{item.category}</Card.Text>

                                {/* <div className="order-quantity">

                                    <Button> - </Button>
                                    <input value={}
                                    <Button> + </Button>

                                </div> */}

                               <span>
                               <Form.Group className="input mb-3" controlId="sim">
                                    <span>
                                    <Form.Label>Quantity</Form.Label> 
                                    <Form.Control 
                                        type="number" 
                                        size="sm"
                                        placeholder={item.quantity}
                                        value={quantity}
                                            onChange={e => setQuantity(e.target.value)}
                                        />
                                    </span>
                                </Form.Group>
                                <Button className="m-1 mb-5" variant="primary" onClick={() => () => setQuantity(item._id, + 1)}>
                                    +
                                </Button>
                                <Button className="m-1 mb-5" variant="secondary" onClick={() => updateQuantity(item._id, -1)}>
                                    -
                                </Button>
                               </span>

                               <Button className="m-5 mt-5" variant="primary" onClick={() => checkout(item._id, item.quantity)}>
                                CheckOut
                                </Button>
                                <Button className="m-5 mt-5" variant="secondary" onClick={closeCart}>
                                    Cancel
                                </Button>
                        </div>
                    ))}
                
                    
                    
                    
                            
                  
                    </Modal.Body>
                </Modal>           
                
            </Container>

            
        </>

        
    )
}