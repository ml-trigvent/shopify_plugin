import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import orderReducer from './slices/orderSlice'
import logReducer from './slices/logSlice'
import settingsReducer from './slices/settingsSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: orderReducer,
        logs: logReducer,
        settings: settingsReducer,
    },
})
