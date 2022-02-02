import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import { useTypedSelector } from './hooks/useTypedSelector';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthApi } from './services/api/auth';
import { checkAuth } from './store/actions/UserActions';

const App = () => {
  const dispatch = useDispatch()
  const { data } = useTypedSelector(state => state.user)
  const navigate = useNavigate()


  const isAuth = !!data

  React.useEffect(() => {
    if (isAuth) {
      // navigate("/home")
    }
  }, [isAuth, navigate])


  React.useEffect(() => {
    try {
      dispatch(checkAuth())
    } catch (err) {
      console.log(err);
    }
  }, [])


  return (
    <div className="wrapper">
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;