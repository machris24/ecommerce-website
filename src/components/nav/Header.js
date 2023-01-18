// Importing Dependencies
import { Container } from 'react-bootstrap';

// Importing Components
import NavSearch from './NavSearch';

import './styles/Header.css';

export default function Header() {

    return (
        <Container className='header-wrapper'>
            <div className='sticky-top'>
            <NavSearch />
            </div>
            
        </Container>
      
    )
}