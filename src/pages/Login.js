// Import Dependencies/Modules
import { useState, useEffect, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import UserContext from "../UserContext";

// Import assets
import { CgMail, CgKey } from 'react-icons/cg';
import Welcome from '../images/Welcome.svg'
import './styles/Login.css';

export default function Login() {

    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    console.log(email)
    console.log(password)

    // *****FUNCTIONS******

    function validate(e) {
        e.preventDefault()

        fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                email: email, 
                password: password
            })
        }) // FIRST!(1) <<----
        . then(res => res.json()) //<-- SECOND! (2)
        .then(data => {
           
            console.log(data);

            //--> access from usercontroller(api)
            if(typeof data.access !== "undefined") {
                localStorage.setItem('token', data.access) // passthe jwt to local storage
                retrieveProfile(data.access)

                Swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    text: "Welcome Back!"
                })
            } else {

                Swal.fire({
                    title: "Authentication Failed",
                    icon: "error",
                    text: "Please check your login details and try again."
                })
            }

        }); 

        // Clearing the input fields and states
        setEmail("");
        setPassword("");

    }

    const retrieveProfile = (token) => {

        fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
                
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);

            // Global user state for validation accross the whole app
            setUser({
                id: data._id,
                isAdmin: data.isAdmin
            });

        })

    }
        if(user.isAdmin === true) {
            navigate("/admin");
        } else if(user.isAdmin === false) {
            navigate("/");
        }

    useEffect(() => {
        if(email !== "" && password !== "" ){
            setIsActive(true)
        } else {
            setIsActive(false)
        }
    }, [email, password]);


    return (

        // (user.id !== null) ? 

        //     <Navigate to="/signup" />
        //     :
            <Container className="login-wrapper" >
                    <Form className="loginForm" onSubmit={e => validate(e)}>

                        <h1 className="hi">Login </h1>

                        <Form.Group className="input mb-3" controlId="formField">
                            <span>
                                <span>
                                    <CgMail className="icon" size={20}/>
                                    <Form.Control 
                                        type="email" 
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </span>
                            </span>      
                        </Form.Group>

                        <Form.Group className="input mb-3" controlId="formField">
                            <span>
                                <span>
                                    <CgKey className="icon" size={20}/>
                                    <Form.Control 
                                        type="password" 
                                        placeholder="Password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </span>
                            </span>   
                        </Form.Group>

                        {
                            isActive ?
                                <Button className="btnlogin" variant="primary" type="submit">
                                    Login
                                </Button>
                                :
                                <Button className="btnlogin" variant="primary" type="submit" disabled>
                                    Login
                                </Button>
                        }

                         
                                                
                    </Form>

                    <div id="left-panel">

                    <img src={Welcome} alt="Welcome" className="image"/>
                    <div className="content">
                        <h3> New here? </h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <Button as={Link} to='/signup'>SignUp!</Button>
                        </div>

                        
                    </div>
                                
            </Container>

    )

}