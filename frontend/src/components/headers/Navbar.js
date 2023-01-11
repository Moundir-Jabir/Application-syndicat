import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/feature/auth/authSlice'

const Navbar = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signout = () => {
        dispatch(logout())
        navigate('/login')
    }

    return (
        <header className="page-topbar" id="header">
            <div className="navbar navbar-fixed">
                <nav className="navbar-main navbar-color nav-collapsible sideNav-lock navbar-dark gradient-45deg-indigo-purple no-shadow">
                    <div className="nav-wrapper">
                        <ul className="navbar-list left">
                            <li><NavLink to='/dashboard' className="waves-effect waves-block waves-light profile-button" data-target="profile-dropdown">Accueil</NavLink></li>
                        </ul>
                        <ul className="navbar-list right">
                            <li onClick={signout}><a className="waves-effect waves-block waves-light notification-button" data-target="notifications-dropdown"><i className="material-icons">exit_to_app</i></a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar