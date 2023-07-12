export const BACKEND_URL = 'http://localhost:8080';
export const AUTH_URL = 'http://localhost:4000';

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

export const DELETEFLIGHT =(flightId) => {
 return { 
  url: '/flights/:flightId',
  method: 'delete'
}
}