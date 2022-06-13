import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import './App.css';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Inbox from './Component/Inbox';
import Navbar from './Component/Navbar';
import CreateMail from './Component/CreateMail';

function App() {
  const isLoggedIn = useSelector(state=> state.auth.isLoggedIn);

  return (
    <div className="App">
      <h1>Mail Box Client</h1>
      <Navbar />
      <Route path='/inbox'>
        {isLoggedIn && <Inbox />}
        {!isLoggedIn && <Redirect to='/login' />}
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
      <Route path='*'><Redirect to='/login'/></Route>
    </div>
  );
}

export default App;
