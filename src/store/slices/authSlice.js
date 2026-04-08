import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shop: localStorage.getItem('shop') || null,
    isAuthenticated: !!localStorage.getItem('shop'),
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setShop: (state, action) => {
            state.shop = action.payload
            state.isAuthenticated = true
            localStorage.setItem('shop', action.payload)
        },
        logout: (state) => {
            state.shop = null
            state.isAuthenticated = false
            localStorage.removeItem('shop')
        },
    },
})

export const { setShop, logout } = authSlice.actions
export default authSlice.reducer
