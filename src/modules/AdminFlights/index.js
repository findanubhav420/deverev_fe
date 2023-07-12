import { TextField, Button, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import './AdminFlights.css';
import { useNavigate } from 'react-router-dom';
import { makeRequest } from '../../utils/makeRequest/index';
import { GETALLFLIGHTS, DELETEFLIGHT, ADDFLIGHT } from '../../constants/apiEndPoints';
const moment = require('moment');

const AdminFlights = () => {
	const [ showModal, setShowModal ] = useState(false);
    const [ flights, setFlights ] = useState([]);
    const [ flightNo, setFlightNo ] = useState('');
    const [ companyName, setCompanyName ] = useState('');
    const [ arrivalTime, setArrivalTime ] = useState('');
    const [ departureTime, setDepartureTime ] = useState('');
    const [ source, setSource ] = useState('');
    const [ destination, setDestination ] = useState('');
    const [ price, setPrice ] = useState('');

    const navigate = useNavigate();

	const handleOpen = () => setShowModal(true);
	const handleClose = () => setShowModal(false);
    useEffect(() => {
        makeRequest(GETALLFLIGHTS, navigate).then((res) => {
            setFlights(res);
        })
    },[])

    // const handleDelete = (flightId) => async () => {
    //     const response = await makeRequest(DELETEFLIGHT, navigate, {
    //         data: {
    //             flightId: flightId,
    //         },
    //     });
    //     makeRequest(GETALLFLIGHTS, navigate).then((res) => {
    //         setFlights(res);
    //     })
    // }

    // const handleAdd = async () => {
    //     const response = await makeRequest(ADDFLIGHT, navigate, {
    //         data: {
    //             flightId: flightNo,
    //             ComapanyName: companyName,
    //             arrivalDate: arrivalTime,
    //             departureDate: departureTime,
    //             source: source,
    //             destination: destination,
    //             price: price,
    //         },
    //     });
    //     makeRequest(GETALLFLIGHTS, navigate).then((res) => {
    //         setFlights(res);
    //     })
    // }
  return (
    <div className='admin-flights'>
        <div className='admin-flights-header'>
            <div>All Flights</div>
            <Button onClick={handleOpen} variant='contained'>Add Flight</Button>
        </div>
        <div className='admin-flights-all'>
            <div className='admin-flight'>
                <div>FlightID</div>
                <div>ComapanyName</div>
                <div>Arrival</div>
                <div>Departure</div>
                <div>From</div>
                <div>To</div>
                <div>Price</div>
            </div>
            {
                flights?.map((flight) => {
                    return (
                        <div className='admin-flight'>
                            <div>{flight.flightId}</div>
                            <div>{flight.ComapanyName}</div>
                            <div>{moment(flight.arrivalTime).format("YYYY-MM-DD, HH:mm")}</div>
                            <div>{moment(flight.departureTime).format("YYYY-MM-DD, HH:mm")}</div>
                            <div>{flight.source}</div>
                            <div>{flight.destination}</div>
                            <div>{flight.price}</div>
                            <Button variant='contained'>Remove</Button>
                        </div>
                    )
                })
            }
        </div>
        <Modal
            open={showModal}
            onClose={handleClose}
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
							<Button variant='outlined'>ADD</Button>
					</div>
    	</Modal>
    </div>
  )
}

export default AdminFlights;

