import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import './App.css';
import SignUp from './Component/SignUp';
import Login from './Component/Login';
import Home from './Component/Home';
import Navbar from './Component/Navbar';

function App() {
  const isLoggedIn = useSelector(state=> state.auth.isLoggedIn);

  return (
    <div className="App">
      <h1>Mail Box Client</h1>
      <Navbar />
      <Route path='/home'>
        {isLoggedIn && <Home/>}
        {!isLoggedIn && <Redirect to='/login' />}
      </Route>
      <Route path='/signUp'>
        <SignUp />
      </Route>
      <Route path='/login'>
        <Login />
      </Route>
      <Route path='*'><Redirect to='/login'/></Route>
    </div>
  );
}

export default App;
