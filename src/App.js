// Import Dependencies/Modules
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext'

// import components
import Error from './components/Error';

//  Import Pages
import AddProducts from './pages/AddProducts';
import AdminDashboard from './pages/AdminDashBoard';
import Home from './pages/Home';
import Login from './pages/Login';
import Logout from './pages/Logout';
import Products from './pages/Products';
import SignUp from './pages/SignUp';

// Import other assets
import './App.css';


function App() {


  const [user, setUser] = useState({

    id: null,
    isAdmin:null

  });

  const unsetUser = () => {
    localStorage.clear();
  }

  useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(res => res.json())
    .then(data => {

        if(typeof data._id !== "undefined") {

            setUser({
              id: data._id,
              isAdmin: data.isAdmin
          })

        } else {
            setUser({
              id: null,
              isAdmin: null
          })
        }
        
    })
  }, [])

  return (
    <UserProvider value={{user, setUser, unsetUser}}>
      <div>
      <Router>
          <Container>
            <Routes>
            <Route path="*" element={<Error/>} /> 
            <Route path="/admin" element={<AdminDashboard/>} />
            <Route path="/products/add" element={<AddProducts/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/products" element={<Products/>} />
            <Route path="/" exact element={<Home/>} />
            </Routes>
          </Container>
        </Router>
      </div>
    </UserProvider>
      
  );
}

export default App;
