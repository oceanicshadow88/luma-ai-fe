import React from 'react'
import { Outlet } from 'react-router-dom'

const AuthLayout:React.FC = () => {
    return (
        <div className='w-full flex'>
            <Outlet />
            <footer></footer>
        </div>
    )
}

export default AuthLayout
