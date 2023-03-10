import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import toastr from 'toastr'
import 'toastr/build/toastr.css'

const api_auth = `${process.env.REACT_APP_API_URL}/auth`

export const login = createAsyncThunk('auth/login', async (user) => {
    let result
    await axios.post(`${api_auth}/login`, user)
        .then(data => {
            toastr.success('User logged successfuly', 'Login', {
                positionClass: "toast-bottom-left"
            })
            localStorage.setItem('user', JSON.stringify(data.data.user))
            localStorage.setItem('token', JSON.stringify(data.data.token))
            result = data.data
        })
        .catch(err => {
            if (err.response.data.erreur) {
                toastr.warning(err.response.data.erreur, 'Please Check form !', {
                    positionClass: "toast-bottom-left"
                })
            } else {
                toastr.warning("Problem connection", 'Sorry !', {
                    positionClass: "toast-bottom-left"
                })
            }
            result = { user: false, token: false }
        })
    return result
})

export const logout = createAsyncThunk('auth/logout', async () => {
    let result
    await axios.get(`${api_auth}/logout`)
        .then(() => {
            toastr.success('Logout successefuly', 'Logout', {
                positionClass: "toast-bottom-left"
            })
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            result = { user: false, token: false }
        })
    return result
})

let initialToken = JSON.parse(localStorage.getItem('token')) || false
let initialUser = JSON.parse(localStorage.getItem('user')) || false
const initialState = {
    user: initialUser,
    token: initialToken
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        [login.fulfilled]: (state, { payload }) => {
            return {
                ...state, ...payload
            }
        },
        [login.rejected]: () => {
            console.log("login request rejected")
        },
        [logout.fulfilled]: (state, { payload }) => {
            return {
                ...state, ...payload
            }
        }
    }
})

export default authSlice.reducer