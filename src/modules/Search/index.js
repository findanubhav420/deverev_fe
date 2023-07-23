import './Search.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { decodeToken } from 'react-jwt';
import { TextField, Button, Modal } from '@mui/material';
import { makeRequest } from '../../utils/makeRequest';
import { GETALLFLIGHTS, BOOKFLIGHT } from '../../constants/apiEndPoints';
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

const Search = () => {
    const navigate = useNavigate();
    const decodedToken = decodeToken(localStorage.getItem('token'));

    if(!decodedToken || decodeToken.role === true) navigate('/login');


    const [ dateTime, setDateTime ] = useState({
        date: '',
        time: '',
    });
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [flightNo, setFlightNo] = useState({});

    const [ flights, setFlights ] = useState([]);

    const [ showModal, setShowModal ] = useState(false);
	const handleOpen=() => {
        setShowModal(true)
    };
	const handleClose = () => setShowModal(false);
    const handleFlightId = (flight) => {
        setFlightNo(flight);
        handleOpen();
    }

    const handleBooking = async () => {
       await makeRequest(BOOKFLIGHT, navigate, {
            data: {
                flightId: flightNo.flightId,
                userId: decodedToken.id,
                email: email,
                name: name,
                age: age,
                phoneNo: mobileNumber,
            },
        });
        handleClose();
        navigate('/booking');
    }

    const handleSearch = async () => {
        await makeRequest(GETALLFLIGHTS, navigate).then((res) => {
            if(res) {
                if(dateTime.date !== '' && dateTime.time !== '' && source !== '' && destination !== '') {
                    const date = moment(dateTime.date).format('YYYY-MM-DD');
                    
                    const dateTimeString = date + ' ' + dateTime.time;
                    const filteredFlights = res.filter((flight) => {
                        console.log(moment(flight.departureTime).format('YYYY-MM-DD HH:mm'),  dateTimeString);
                        return moment(flight.departureTime).format('YYYY-MM-DDTHH:mm') == dateTimeString && flight.source === source && flight.destination === destination;
                    })

                    setFlights(filteredFlights);
                }
                else if(dateTime.date !== '' && dateTime.time === '' && source !== '' && destination !== '') {
                    const date = moment(dateTime.date).format('YYYY-MM-DD');
                    const filteredFlights = res.filter((flight) => {
                        return moment(flight.departureTime).format('YYYY-MM-DD') === date && flight.source === source && flight.destination === destination;
                    })

                    setFlights(filteredFlights);
                }
                else if(dateTime.date !== '' && dateTime.time !== '' && source === '' && destination === '') {
                    const date = moment(dateTime.date).format('YYYY-MM-DD');
                    const dateTimeString = date + 'T' + dateTime.time;
                    const filteredFlights = res.filter((flight) => {
                        return moment(flight.departureTime).format('YYYY-MM-DDTHH:mm') === dateTimeString;
                    })

                    setFlights(filteredFlights);
                }
                else if(source !== '' && destination !== '' && dateTime.date === '' && dateTime.time === '') {
                    const filteredFlights = res.filter((flight) => {
                        return flight.source === source && flight.destination === destination;
                    })

                    setFlights(filteredFlights);
                }
                else if(source === '' && destination === '' && dateTime.date !== '' && dateTime.time === '') {
                    const date = moment(dateTime.date).format('YYYY-MM-DD');
                    const filteredFlights = res.filter((flight) => {
                        return moment(flight.departureTime).format('YYYY-MM-DD') === date;
                    })

                    setFlights(filteredFlights);
                }
                else if(source === '' && destination === '' && dateTime.date === '' && dateTime.time !== '') {
                    console.log(typeof dateTime.time);
                    const filteredFlights = res.filter((flight) => {
                        console.log(moment(flight.departureTime).format('HH:mm'), dateTime.time);
                        return moment(flight.departureTime).format('HH:mm') === dateTime.time;
                    })

                    setFlights(filteredFlights);
                }
                else {
                    setFlights(res);
                }
            }
        })
    }

    return (
        <div className='search'>
            <div className='search-header'>
                <div className='title2'>Flight Search</div>
                <div className='search-filter'>
                    <TextField variant="outlined" label='Source' onChange={(e)=>setSource(e.target.value)}/>
                    <TextField variant="outlined" label='Destination' onChange={(e)=>setDestination(e.target.value)}/>
                    <TextField variant="outlined" type='date' onChange={(e) => setDateTime({ ...dateTime, date: e.target.value })}/>
                    <TextField variant="outlined" type='time' onChange={(e) => setDateTime({ ...dateTime, time: e.target.value })}/>
                    
                    <Button variant='contained' onClick={handleSearch}>Search</Button>
                    <Button variant='contained' onClick={()=>navigate('/booking')}>My Bookings</Button>
                </div>
            </div>
            <div className='search-results'>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Flight No.</StyledTableCell>
                            <StyledTableCell  >Source</StyledTableCell>
                            <StyledTableCell  >Destination</StyledTableCell>
                            <StyledTableCell  >Departure Time</StyledTableCell>
                            <StyledTableCell  >Arrival Time</StyledTableCell>
                            <StyledTableCell  >Seats Available</StyledTableCell>
                            <StyledTableCell  >Price</StyledTableCell>
                            <StyledTableCell  >Book</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {flights.map((flight) => (
                            <StyledTableRow key={flight.flightId}>
                            <StyledTableCell component="th" scope="row">
                                {flight.flightId}
                            </StyledTableCell>
                            <StyledTableCell >{flight.source}</StyledTableCell>
                            <StyledTableCell >{flight.destination}</StyledTableCell>
                            <StyledTableCell  >{moment(flight.departureTime).format("ddd, MMMM Do,H:mm")}</StyledTableCell>
                            <StyledTableCell  >{moment(flight.arrivalTime).format("ddd, MMMM Do,H:mm")}</StyledTableCell>
                            <StyledTableCell  >{flight.seat}</StyledTableCell>
                            <StyledTableCell  >{flight.price}</StyledTableCell>
                            <StyledTableCell  ><Button variant='contained' onClick={() => handleFlightId(flight)}>Book</Button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Modal
							open={showModal}
							onClose={handleClose}
							className='booking-modal'
            >
							<div className='booking-form'>
								<div className='form-title'>Booking for Flight</div>
								<TextField label="Name" variant="outlined" onChange={(e)=>setName(e.target.value)} />
								<TextField label="Age" variant="outlined" onChange={(e)=>setAge(e.target.value)}/>
                                <TextField label="Email" variant="outlined" onChange={(e)=>setEmail(e.target.value)}/>
                                <TextField label="Mobile Number" variant="outlined" onChange={(e)=>setMobileNumber(e.target.value)}/>
                                *Note: Seats are booked serially and are non-transferable.
								<Button variant='outlined' onClick={handleBooking}>Book</Button>
							</div>
            </Modal>
        </div>
    )};

export default Search;
