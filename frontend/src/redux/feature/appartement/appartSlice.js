import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios"
import toastr from 'toastr'
import 'toastr/build/toastr.css'

const api_appart = `${process.env.REACT_APP_API_URL}/appartement`
const api_payment = `${process.env.REACT_APP_API_URL}/payment`

export const getAllAppart = createAsyncThunk('appart/getAllAppart', async ({ token, numero }) => {
    let result = []
    await axios.get(`${api_appart}?numero=${numero}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(data => {
            result = data.data.appartements
        })
    return result
})

export const addAppart = createAsyncThunk('appart/addAppart', async ({ token, newAppart }) => {
    let result
    await axios.post(`${api_appart}`, newAppart, { headers: { Authorization: `Bearer ${token}` } })
        .then(data => {
            result = data.data
            toastr.success('Appartement ajouté', 'Success', {
                positionClass: "toast-bottom-left"
            })
        })
        .catch(err => {
            if (err.response.data.error) {
                toastr.warning(err.response.data.error, 'Erreur !', {
                    positionClass: "toast-bottom-left"
                })
            } else {
                toastr.warning("Problem connection", 'Sorry !', {
                    positionClass: "toast-bottom-left"
                })
            }
            result = false
        })
    return result
})

export const updateAppart = createAsyncThunk('appart/updateAppart', async ({ token, id, newAppart }) => {
    let result
    await axios.patch(`${api_appart}/${id}`, newAppart, { headers: { Authorization: `Bearer ${token}` } })
        .then(data => {
            result = data.data
            toastr.success('Appartement modifié', 'Success', {
                positionClass: "toast-bottom-left"
            })
        })
        .catch(err => {
            if (err.response.data.erreur) {
                toastr.warning(err.response.data.erreur, 'Erreur !', {
                    positionClass: "toast-bottom-left"
                })
            } else {
                toastr.warning("Problem connection", 'Sorry !', {
                    positionClass: "toast-bottom-left"
                })
            }
            result = false
        })
    return result
})

export const addPayment = createAsyncThunk('appart/addPayment', async ({ token, payment, id }) => {
    let result
    await axios.post(`${api_payment}/${id}`, payment, { headers: { Authorization: `Bearer ${token}` } })
        .then(data => {
            result = data.data
            toastr.success('Payment ajouté', 'Success', {
                positionClass: "toast-bottom-left"
            })
        })
        .catch(err => {
            if (err.response.data.erreur) {
                toastr.warning(err.response.data.erreur, 'Erreur !', {
                    positionClass: "toast-bottom-left"
                })
            } else {
                toastr.warning("Problem connection", 'Sorry !', {
                    positionClass: "toast-bottom-left"
                })
            }
            result = false
        })
    return result
})

export const getPayment = createAsyncThunk('appart/getPayment', async ({ token, id }) => {
    let result
    await axios.get(`${api_payment}/${id}`, { headers: { Authorization: `Bearer ${token}` } })
        .then(data => {
            result = data.data.payments
        })
    return result
})

const initialState = {
    appartements: [],
    paymentsOfAppartement: []
}

const appartSlice = createSlice({
    name: 'appart',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllAppart.fulfilled]: (state, { payload }) => {
            return {
                ...state, appartements: payload
            }
        },
        [addAppart.fulfilled]: (state, { payload }) => {
            if (payload)
                return {
                    ...state, appartements: [payload, ...state.appartements]
                }
            else
                return state
        },
        [updateAppart.fulfilled]: (state, { payload }) => {
            if (payload) {
                let newApparts = state.appartements.map(app => {
                    if (app._id == payload._id)
                        app = payload
                    return app
                })
                return {
                    ...state, appartements: newApparts
                }
            }
            else
                return state
        },
        [addPayment.fulfilled]: (state, { payload }) => {
            if (payload) {
                let newApparts = state.appartements.map(app => {
                    if (app._id == payload.app._id)
                        app = payload.app
                    return app
                })
                return {
                    ...state, appartements: newApparts, paymentsOfAppartement: [payload.payment, ...state.paymentsOfAppartement]
                }
            }
            else
                return state
        },
        [getPayment.fulfilled]: (state, { payload }) => {
            return {
                ...state, paymentsOfAppartement: payload
            }
        }
    }
})

export default appartSlice.reducer