import { TextField, Button, Modal } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { decodeToken } from 'react-jwt';
import './AdminFlights.css';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../utils/makeRequest/index';
import { GETALLFLIGHTS, DELETEFLIGHT, ADDFLIGHT, GETALLFLIGHTBOOKINGS, GETFLIGHTBYID } from '../../constants/apiEndPoints';
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

const AdminFlights = () => {
	const [ showModal, setShowModal ] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [ flights, setFlights ] = useState([]);
    const [ flightNo, setFlightNo ] = useState('');
    const [ companyName, setCompanyName ] = useState('');
    const [ arrivalTime, setArrivalTime ] = useState('');
    const [ departureTime, setDepartureTime ] = useState('');
    const [ source, setSource ] = useState('');
    const [ destination, setDestination ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ bookings, setBookings ] = useState([]);
    const [ selectedFlight, setSelectedFlight ] = useState({});

    const navigate = useNavigate();

	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);
    const handleBookings = async (flightId) => {
        setShowBookingModal(true);
        await makeRequest(GETALLFLIGHTBOOKINGS(flightId), navigate).then((res) => {
            setBookings(res);
        });

        await makeRequest(GETFLIGHTBYID(flightId), navigate).then((res) => {
            setSelectedFlight(res);
        });
    };
    const handleBookingClose = () => setShowBookingModal(false);
    useEffect(() => {
        const decodedToken = decodeToken(localStorage.getItem('token'));
        if(!decodedToken || decodedToken.role === false) navigate('/login');
        else
        makeRequest(GETALLFLIGHTS, navigate).then((res) => {
            setFlights(res);
        })
    },[])

    const handleDelete = (flightId) => async () => {
        await makeRequest(DELETEFLIGHT(flightId), navigate)
           
    
        await makeRequest(GETALLFLIGHTS, navigate).then((res) => {
            setFlights(res);
        })
    }

    const handleAdd = async () => {
        await makeRequest(ADDFLIGHT, navigate, {
            data: {
                flightId: flightNo,
                companyName: companyName,
                arrivalTime: arrivalTime,
                departureTime: departureTime,
                source: source,
                destination: destination,
                price: price,
            },
        });
        await makeRequest(GETALLFLIGHTS, navigate).then((res) => {
            setFlights(res);
        })
        handleClose();
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

  return (
    <div className='admin-flights'>
        <div className='admin-flights-header'>
            <div className='title'>All Flights</div>
            <div>
            <Button onClick={handleOpen} variant='contained'>Add Flight</Button>
            <Button onClick={handleLogout} variant='contained' style={{marginLeft: 20}}>Logout</Button>
            </div>
        </div>
        <div className='admin-flights-all'>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                    <TableRow>
                        <StyledTableCell>Flight No</StyledTableCell>
                        <StyledTableCell >Company Name</StyledTableCell>
                        <StyledTableCell >Departure Time</StyledTableCell>
                        <StyledTableCell >Arrival Time</StyledTableCell>
                        <StyledTableCell >Source</StyledTableCell>
                        <StyledTableCell >Destination</StyledTableCell>
                        <StyledTableCell >Seats Available</StyledTableCell>
                        <StyledTableCell >Price</StyledTableCell>
                        <StyledTableCell >Delete</StyledTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {flights.map((flight) => (
                        <StyledTableRow key={flight.flightId} >
                        <StyledTableCell component="th" scope="row" onClick={()=>handleBookings(flight.flightId)}>
                            {flight.flightId}
                        </StyledTableCell>
                        <StyledTableCell onClick={()=>handleBookings(flight.flightId)}>{flight.companyName}</StyledTableCell>
                        <StyledTableCell onClick={()=>handleBookings(flight.flightId)}>{moment(flight.departureTime).format('DD-MM-YYYY HH:mm')}</StyledTableCell>
                        <StyledTableCell onClick={()=>handleBookings(flight.flightId)}>{moment(flight.arrivalTime).format('DD-MM-YYYY HH:mm')}</StyledTableCell>
                        <StyledTableCell onClick={()=>handleBookings(flight.flightId)}>{flight.source}</StyledTableCell>
                        <StyledTableCell onClick={()=>handleBookings(flight.flightId)}>{flight.destination}</StyledTableCell>
                        <StyledTableCell onClick={()=>handleBookings(flight.flightId)}>{flight.seat}</StyledTableCell>
                        <StyledTableCell onClick={()=>handleBookings(flight.flightId)}>{flight.price}</StyledTableCell>
                        <StyledTableCell ><Button variant='contained' onClick={handleDelete(flight.flightId)}>Delete</Button></StyledTableCell>
                        </StyledTableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        <Modal
            open={showModal}
            onClose={handleClose}
            style={{
            overflow: "auto",
            alignItems: "center",
            justifyContent: "center",
            height: '95vh',
            width: '100%',
            }}
        >
					<div className='flight-form'>
							<div className='form-title'>Add Flight</div>
                            <TextField 
                                label='Flight No'
                                variant='outlined'
                                value={flightNo}
                                onChange={(e) => setFlightNo(e.target.value)}
                            />
                            <TextField
                                label='Company Name'
                                variant='outlined'
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                            />
                            <TextField
                                label='Arrival Time'
                                variant='outlined'
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                            />
                            <TextField

                                label='Departure Time'
                                variant='outlined'
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                            />
                            <TextField
                                label='Source'
                                variant='outlined'
                                value={source}
                                onChange={(e) => setSource(e.target.value)}
                            />
                            <TextField
                                label='Destination' 
                                variant='outlined'
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                            />
                            <TextField
                                label='Price'
                                variant='outlined'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />     
							<Button variant='outlined' onClick={handleAdd}>ADD</Button>
					</div>
    	</Modal>

        <Modal
            open={showBookingModal}
            onClose={handleBookingClose}
            style={{
            overflow: "auto",
            alignItems: "center",
            justifyContent: "center",
            height: '95vh',
            width: '100%',
            }}
        >
                    <div className='flight-form'>
                            <div className='form-title'>Flight Detail</div>
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
                                        <StyledTableCell >Seat Available</StyledTableCell>
                                        <StyledTableCell >Price</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <StyledTableRow key={selectedFlight.flightId}>
                                        <StyledTableCell component="th" scope="row">
                                            {selectedFlight.flightId}
                                        </StyledTableCell>
                                        <StyledTableCell >{selectedFlight.companyName}</StyledTableCell>
                                        <StyledTableCell >{selectedFlight.source}</StyledTableCell>
                                        <StyledTableCell >{selectedFlight.destination}</StyledTableCell>
                                        <StyledTableCell >{moment(selectedFlight.departureTime).format('DD-MM-YYYY HH:mm')}</StyledTableCell>
                                        <StyledTableCell >{moment(selectedFlight.arrivalTime).format('DD-MM-YYYY HH:mm')}</StyledTableCell>
                                        <StyledTableCell >{selectedFlight.seat}</StyledTableCell>
                                        <StyledTableCell >{selectedFlight.price}</StyledTableCell>
                                        </StyledTableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className='form-title'>Total Bookings</div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                    <TableHead>
                                    <TableRow>
                                       <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>Age</StyledTableCell>
                                        <StyledTableCell>Email</StyledTableCell>
                                        <StyledTableCell>Mobile Number</StyledTableCell>
                                        <StyledTableCell>Seat Number</StyledTableCell>
                                        <StyledTableCell>Booking Time</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {bookings && bookings.map((booking) => (
                                        <StyledTableRow key={booking.bookingId}>
                                        <StyledTableCell component="th" scope="row">
                                            {booking.name}
                                        </StyledTableCell>
                                        <StyledTableCell >{booking.age}</StyledTableCell>
                                        <StyledTableCell >{booking.email}</StyledTableCell>
                                        <StyledTableCell >{booking.phoneNo}</StyledTableCell>
                                        <StyledTableCell >{booking.seat}</StyledTableCell>
                                        <StyledTableCell >{moment(booking.createdAt).format('DD-MM-YYYY HH:mm')}</StyledTableCell>
                                        </StyledTableRow>
                                    ))}       
                                    </TableBody>
                                </Table>
                            </TableContainer>
                    </div>
        </Modal>
    </div>
  )
}

export default AdminFlights;

