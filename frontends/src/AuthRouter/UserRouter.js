import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
export default function UserRouter({children}) {
    const ctx = useContext(DataContext)
  return (
    <>
    {
        ctx.isloggedin && children
    }
    </>
  )
}
