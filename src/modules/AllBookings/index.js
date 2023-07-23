import './AllBookings.css';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { decodeToken } from 'react-jwt';
import { Button } from '@mui/material';
import {GETALLBOOKINGSBYID, DELETEBOOKING} from '../../constants/apiEndPoints';
import { makeRequest } from '../../utils/makeRequest';
import { useNavigate } from 'react-router-dom';
const moment = require('moment');


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const AllBookings = () => {
const navigate = useNavigate();
const [bookings, setBookings] = useState([]);
const decodedToken = decodeToken(localStorage.getItem('token'));

useEffect(() => {
    if(!decodedToken || decodedToken.role === true) navigate('/login');
    else
    makeRequest(GETALLBOOKINGSBYID(decodedToken.id), navigate).then((res) => {
        setBookings(res);
    })
}, [])

const handleDelete = async (bookingId) => {
   await makeRequest(DELETEBOOKING(bookingId), navigate);
   await makeRequest(GETALLBOOKINGSBYID(decodedToken.id), navigate).then((res) => {
    setBookings(res);
    })
}

const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
}


  return (
    <div className='user-bookings'>
        <div className='title'>All Bookings</div>
        <Button variant='contained' onClick={() => navigate('/search')}>Search Flights</Button>
        <Button variant='contained' onClick={handleLogout}>Logout</Button>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Flight Number</StyledTableCell>
                    <StyledTableCell >Company Name</StyledTableCell>
                    <StyledTableCell >From</StyledTableCell>
                    <StyledTableCell >To</StyledTableCell>
                    <StyledTableCell >Departure</StyledTableCell>
                    <StyledTableCell >Arrival</StyledTableCell>
                    <StyledTableCell >Seat</StyledTableCell>
                    <StyledTableCell >Action</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {bookings && bookings.map((booking) => (
                    <StyledTableRow key={booking.id}>
                    <StyledTableCell component="th" scope="row">
                        {booking.flightId}
                    </StyledTableCell>
                    <StyledTableCell>{booking.companyName}</StyledTableCell>
                    <StyledTableCell >{booking.source}</StyledTableCell>
                    <StyledTableCell >{booking.destination}</StyledTableCell>
                    <StyledTableCell >{moment(booking.departureTime).format("ddd, MMMM Do,H:mm")}</StyledTableCell>
                    <StyledTableCell>{moment(booking.arrivalTime).format("ddd, MMMM Do,H:mm")}</StyledTableCell>
                    <StyledTableCell>{booking.seat}</StyledTableCell>
                    <StyledTableCell><Button variant='contained' onClick={()=>handleDelete(booking.bookingId)}>Cancel</Button></StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  );
};

export default AllBookings;
