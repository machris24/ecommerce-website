// Import Dependencies/Modules
import { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import Header from "../components/nav/Header";
import UserContext from "../UserContext";

export default function AddProducts() {

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stocks, setStocks] = useState('');
    const [category, setCategory] = useState('');
 

    const [isActive, setIsActive] = useState(false);

    console.log(name)
    console.log(description)
    console.log(price)
    console.log(stocks)
    console.log(category)

    // ******FUNCTION******

    function addProduct (e) {

		e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/products/add`, {
			method: "POST",
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

			if (data === true) {

                // Clear input fields
						setName("");
						setDescription("")
						setPrice("");
						setStocks("");
						setCategory("");

				Swal.fire({
					title: "Product Published",
					icon: "success",
					text: "You have successfully added a product!"
				})
			} else {

                Swal.fire({
                    title: "Something went wrong",
                    icon: "error",
                    text: "Please, try again."
                })  

            }
        
        })
	
	};

    return (
        <>
        <Header/>
        <Container className="products-wrapper">
                <Form className="productForm" onSubmit={e => addProduct(e)}>

                    <h1 className="hi"> Add an Item </h1>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                {/* <CgQuote className="icon" size={20}/> */}
                                <Form.Control 
                                    type="text" 
                                    placeholder="Product Name"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </span>
                        </span>
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                {/* <CgQuote className="icon" size={20}/> */}
                                <Form.Control 
                                    type="text" 
                                    placeholder="Description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </span>
                        </span> 
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                {/* <GoDeviceMobile className="icon" size={20}/> */}
                                <Form.Control 
                                    type="number" 
                                    placeholder="Price"
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </span>
                        </span> 
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                {/* <CgMail className="icon" size={20}/> */}
                                <Form.Control 
                                    type="number" 
                                    placeholder="Stocks"
                                    value={stocks}
                                    onChange={e => setStocks(e.target.value)}
                                />
                            </span>
                        </span>      
                    </Form.Group>

                    <Form.Group className="input mb-3" controlId="formField">
                        <span>
                            <span>
                                {/* <CgSmileMouthOpen className="icon" size={20}/> */}
                                <Form.Control 
                                    type="text" 
                                    placeholder="Category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                />
                            </span>
                        </span>                           
                    </Form.Group>               

                            <Button className="btnlogin" variant="primary" type="submit">
                                Add
                            </Button> 
                       

                    </Form>
                            
            </Container>
            </>
    )
}