import { useSelector } from 'react-redux';
import { Route ,Routes, Navigate} from 'react-router-dom';

import '../src/Style/App.css';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Inbox from './Component/Inbox';
import Navbar from './Component/Navbar';
import CreateMail from './Component/CreateMail';
import ReadMail from './Component/ReadMail';
import SentMail from './Component/SentMail';
import ReadSentMail from './Component/ReadSentMail';

import logo from './Asset/logo.jpg';
import Header from './Component/Header';

function App() {
  const token = useSelector(state => state.auth.token);
  const isLoggedIn = !!token;

  return (
    <div className="App">
      {!isLoggedIn && <div className='logo'>
        <img src={logo} className='logo-img'/>
      </div>}
      {isLoggedIn && <Header />}
      <div className='mail-body'>
        <div className='sidebar'>
          {isLoggedIn && <Navbar />}
        </div>
        <div className='mailContent'>
          <Routes>
            {!isLoggedIn && <Route path='/signUp' element={<SignUp />} />}
            {!isLoggedIn && <Route path='/login' element={<Login />} />}
            {isLoggedIn && <Route path='/inbox' element={<Inbox />} />}
            {isLoggedIn && <Route path='/sent' element={<SentMail />} />}
            {isLoggedIn && <Route path='/compose' element={<CreateMail />} />}
            {isLoggedIn && <Route path='/mail/:id' element={<ReadMail />} />}
            {isLoggedIn && <Route path='/sentmail/:id' element={<ReadSentMail />} />}
            {!isLoggedIn && <Route path="*" element={<Login />} />}
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
