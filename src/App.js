import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import './App.css';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Inbox from './Component/Inbox';
import Navbar from './Component/Navbar';
import CreateMail from './Component/CreateMail';
import ReadMail from './Component/ReadMail';
import SentMail from './Component/SentMail';
import ReadSentMail from './Component/ReadSentMail';

function App() {
  const token = useSelector(state => state.auth.token);
  const isLoggedIn = !!token;

  useSelector(state=> console.log(state))

  return (
    <div className="App">
      <h1>Mail Box Client</h1>
      <Navbar />
      <Route path='/inbox'>
        {isLoggedIn && <Inbox />}
      </Route>
      <Route path='/sent'>
        {isLoggedIn && <SentMail />}
      </Route>
      <Route path='/signUp'>
        <SignUp />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='/compose'>
        {isLoggedIn && <CreateMail />}
      </Route>
      <Route path='/mail/:id'>
        <ReadMail />
      </Route>
      <Route path='/sentmail/:id'>
        <ReadSentMail />
      </Route>
    </div>
  );
}

export default App;
