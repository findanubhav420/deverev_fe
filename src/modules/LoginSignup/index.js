import './LoginSignup.css';
import { Button, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { makeAuthRequest } from '../../utils/makeRequest/index';
import { USERLOGIN, ADMINLOGIN, REGISTER } from '../../constants/apiEndPoints';

const LoginSignup = ({formType}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const handleUserLogin = async () => {
    const response = await makeAuthRequest(USERLOGIN, navigate, {
      data: {
        email: email,
        password: password,
      },
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', response.data.user);
    navigate('/search');
  };

  const handleUserSignup = async () => {
    const response = await makeAuthRequest(REGISTER, navigate, {
      data: {
        email: email,
        password: password,
      },
    });
    navigate('/login');
  };

  const handleAdminLogin = async () => {
    const response = await makeAuthRequest(ADMINLOGIN, navigate, {
      data: {
        email: email,
        password: password,
      },
    });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', response.data.user);
    navigate('/admin');
  };

  return (
    <div className='login-signup'>
        <div className={formType === 'login' ? 'login-image' : 'signup-image'}/>
        <div className='login-signup-form'>
            <div className='form-title'>{formType}</div>
            <TextField label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)} type='email'/>
            <TextField label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} type='password' />
            <div className='buttons'>
              <Button variant='outlined' onClick={formType==="login"?handleUserLogin:handleUserSignup}>{formType} as user</Button>
              {(formType==="login")&&(<Button variant='outlined' onClick={handleAdminLogin}>{formType} as admin</Button>)}
            </div>
        </div>
    </div>
  );
};

export default LoginSignup;
