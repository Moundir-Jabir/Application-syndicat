import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/navigation/PrivateRoute'
import PublicRoute from './components/navigation/PublicRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Router