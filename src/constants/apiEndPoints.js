require('dotenv').config();

export const BACKEND_URL = process.env.BACKEND;
export const AUTH_URL = process.env.AUTH;

export const USERLOGIN = {
  url: '/userLogin',
  method: 'post'
};

export const ADMINLOGIN = {
  url: '/adminLogin',
  method: 'post'
};

export const REGISTER = {
  url: '/userRegister',
  method: 'post'
};

export const GETALLFLIGHTS = {
  url: '/flights',
  method: 'get'
}

export const BOOKFLIGHT = {
  url: '/bookings',
  method: 'post'
}

export const GETALLBOOKINGS = {
  url: '/bookings',
  method: 'get'
}

export const ADDFLIGHT = {
  url: '/flights',
  method: 'post'
}

export const DELETEFLIGHT = (flightId) => {
 return { 
  url: `/flights/${flightId}`,
  method: 'delete'
}
}

export const GETALLBOOKINGSBYID = (userId) => {
  return {
    url: `/bookings/${userId}`,
    method: 'get'
  }
}

export const DELETEBOOKING = (bookingId) => {
  return {
    url: `/bookings/${bookingId}`,
    method: 'delete'
  }
}

export const GETALLFLIGHTBOOKINGS = (flightId) => {
  return {
    url: `/bookings/flight/${flightId}`,
    method: 'get'
  }
}

export const GETFLIGHTBYID = (flightId) => {
  return {
    url: `/flights/${flightId}`,
    method: 'get'
  }
}


