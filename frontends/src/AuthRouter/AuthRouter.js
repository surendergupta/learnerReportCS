import React, { useState ,useContext} from 'react'
import { Navigate } from 'react-router-dom'
import Main from '../components/SignIn/Main';
import DataContext from '../context/DataContext'
export default function AuthRouter({children}) {
    const ctx =useContext(DataContext);
  return (
    <>
    {
       ctx.isloggedin ? children :<Main/>
    }
    </>
  )
}
