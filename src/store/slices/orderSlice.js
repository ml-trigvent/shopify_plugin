import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async (shop) => {
        // We need both orders and stats. Let's fetch them in parallel.
        const [ordersRes, statsRes] = await Promise.all([
            api.get(`/orders?shop=${shop}`),
            api.get(`/orders/stats?shop=${shop}`)
        ])
        return {
            orders: ordersRes.data.data,
            stats: statsRes.data.data
        }
    }
)

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        list: [],
        stats: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload.orders || []
                state.stats = action.payload.stats || null
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export default orderSlice.reducer
