import './App.css';
import { AdminFlights, Landing, LoginSignup, Search, AllBookings } from './modules';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path='/login' element={<LoginSignup formType='login' />} />
          <Route path='/signup' element={<LoginSignup formType='signup' />} />
          <Route path='/search' element={<Search />} />
          <Route path='/booking' element={<AllBookings />} />
          <Route path='/admin' element={<AdminFlights />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
