import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from "../../components/Login/Login.jsx";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, isLoading} = useSelector((state) => state.user);

  useEffect(() => {
    if(isAuthenticated === true){
      navigate("/");
    }
  }, [])
  
  return (
    <div>
        <Login />
    </div>
  )
}
