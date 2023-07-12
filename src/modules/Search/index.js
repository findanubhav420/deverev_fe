import './Search.css';
import { useState, useEffect } from 'react';
import { TextField, Button, Modal } from '@mui/material';
import { makeRequest } from '../../utils/makeRequest';
import { GETALLFLIGHTS, BOOKFLIGHT } from '../../constants/apiEndPoints';
import { useNavigate } from 'react-router-dom';
const moment = require('moment');

const Search = () => {
    const navigate = useNavigate();
    const [ dateTime, setDateTime ] = useState({
        date: '',
        time: '',
    });
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [flightNo, setFlightNo] = useState('');

    const [ flights, setFlights ] = useState([]);

    const [ showModal, setShowModal ] = useState(false);
		const handleOpen=() => {
            setShowModal(true)
        };
		const handleClose = () => setShowModal(false);

    useEffect(() => {
        makeRequest(GETALLFLIGHTS, navigate).then((res) => {
            // if(res) {
            //     if(dateTime.date !== '' && dateTime.time !== '') {
            //         const date = moment(dateTime.date).format('YYYY-MM-DD');
            //         const time = moment(dateTime.time).format('HH:mm:ss');
            //         const dateTimeString = date + 'T' + time;
            //         const filteredFlights = res.filter((flight) => {
            //             return moment(flight.departureTime).format('YYYY-MM-DDTHH:mm:ss') === dateTimeString;
            //         })

            //         setFlights(filteredFlights);
            //     }
            //     else {                    
            // setFlights(res);
            //     }
            setFlights(res);
            // }
        })
    }, [])

    return (
        <div className='search'>
            <div className='search-header'>
                <div>Flight Search</div>
                <div className='search-filter'>
                    <TextField variant="outlined" type='date' onChange={(e) => setDateTime({ ...dateTime, date: e.target.value })}/>
                    <TextField variant="outlined" type='time' onChange={(e) => setDateTime({ ...dateTime, time: e.target.value })}/>
                    <Button variant='contained'>Search</Button>
                </div>
            </div>
            <div className='search-results'>
                <div className='search-flight'>
                    <div>Flight No.</div>
                    <div>Company Name</div>
                    <div>Departure Time</div>
                    <div>Arrival Time</div>
                    <div>Source</div>
                    <div>Destination</div>
                    <div>Price</div>
                </div>
                {
                    flights?.map((flight) => {
                        return (
                            <div className='search-flight'>
                               <div>{flight.flightId}</div> 
                                <div>{flight.companyName}</div>
                                <div>{moment(flight.departureTime).format("ddd, LT")}</div>
                                <div>{moment(flight.arrivalTime).format("ddd, LT")}</div>
                                <div>{flight.source}</div>
                                <div>{flight.destination}</div>
                                <div>{flight.price}</div>
                                <Button variant='contained'>Book</Button>
                            </div>
                        )
                    })
                }
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
                                <TextField label="Mobile Number" variant="outlined" onChange={(e)=>setMobileNumber(e.target.value)}/>
                                *Note: Seats are booked serially and are non-transferable.
								<Button variant='outlined'>Book</Button>
							</div>
            </Modal>
        </div>
    )};

export default Search;
