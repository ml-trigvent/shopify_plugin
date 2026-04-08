import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchLogs = createAsyncThunk(
    'logs/fetchLogs',
    async (shop) => {
        const response = await api.get(`/logs?shop=${shop}`)
        return response.data
    }
)

const logSlice = createSlice({
    name: 'logs',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogs.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.loading = false
                // Extract the data array from { success: true, data: [] }
                state.list = action.payload.data || []
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export default logSlice.reducer
