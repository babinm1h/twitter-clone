import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router';
import { useTypedSelector } from './hooks/useTypedSelector';
import Home from './pages/Home/Home';
import LoginPage from './pages/LoginPage/LoginPage';
import { AuthApi } from './services/api/auth';
import { checkAuth } from './store/actions/UserActions';
import { BsTwitter } from "react-icons/bs"
import { LoadingState } from './types/TweetsTypes';

const App = () => {
  const dispatch = useDispatch()
  const { data, loadingState } = useTypedSelector(state => state.user)
  const navigate = useNavigate()

  const isAuth = !!data
  const isReady = loadingState !== LoadingState.LOADING && loadingState !== LoadingState.NEVER

  React.useEffect(() => {
    if (isAuth && isReady) {
      navigate("/home")
    } else {
      navigate("/auth")
    }
  }, [isAuth, isReady])


  React.useEffect(() => {
    try {
      dispatch(checkAuth())
    } catch (err) {
      console.log(err);
    }
  }, [dispatch])


  return (
    !isReady
      ? <div className="loading"><BsTwitter size={55} /></div>
      : <div className="wrapper" >
        <Routes>
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </div>
  );
};

export default App;