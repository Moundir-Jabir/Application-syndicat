import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../feature/auth/authSlice'
import appartReducer from '../feature/appartement/appartSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        appart: appartReducer
    },
})

export default store