import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import PrivateRoute from './components/navigation/PrivateRoute'
import PublicRoute from './components/navigation/PublicRoute'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Appartement from './pages/Appartement'
import Accueil from './pages/Accueil'
import PageNotFound from './pages/PageNotFound'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to="/login" />} />
            <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route path='' element={<Accueil />} />
                <Route path='appartement' element={<Appartement />} />
            </Route>
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default Router