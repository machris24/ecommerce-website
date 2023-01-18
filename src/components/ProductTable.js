import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import './ProductTable.css';
import { Button } from 'react-bootstrap';

export default function ProductTable({productProp}) {

  console.log(productProp)

  // Object destructuring
  const { name, description, price, stocks, category, isActive: available , addedByAdmin: { username }, createdOn, orderCart, _id } = productProp;

    return (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableBody>
                <TableRow key={_id}>
                  <TableCell component="th" scope="row"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>{_id}</TableCell>
                  <TableCell>{name}</TableCell>
                  <TableCell>{description}</TableCell>
                  <TableCell>{price}</TableCell>
                  <TableCell>{stocks}</TableCell>
                  <TableCell>{category}</TableCell>
                  <TableCell>{username}</TableCell>
                  <TableCell>{createdOn}</TableCell>
                  <TableCell>{orderCart}</TableCell>
                  <TableCell>{available}</TableCell>
                  <TableCell><Button>Update</Button></TableCell>
                  <TableCell><Button>Disable</Button></TableCell>
                </TableRow>
       
            </TableBody>
          </Table>
      </TableContainer>
    );
  }