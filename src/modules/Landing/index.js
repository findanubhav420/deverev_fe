import './Landing.css';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div className='landing'>
            <div className='landing-content'>
                <div className='landing-title'>Welcome to Flight Booking</div>
                <div className='landing-buttons'>
                    <Button variant="contained" onClick={() => navigate('/login')}>Login</Button>
                    <Button variant="contained" onClick={() => navigate('/signup')}>SignUp</Button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
