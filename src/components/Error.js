import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotFound from '../images/404.svg';


export default function Error() {
    return (
        <div className="error">
            <img src={NotFound} alt="Page Not Found"/>
            <h2>Page Not Found</h2>
            <Button as={Link} to='/'>Go back to homepage</Button>
        </div>
        
        
    )
}