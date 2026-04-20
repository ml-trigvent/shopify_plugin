import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchLogs = createAsyncThunk(
    'logs/fetchLogs',
    async ({ shop, page = 1, limit = 10, search = '' }) => {
        const response = await api.get(`/logs?shop=${shop}&page=${page}&limit=${limit}&search=${encodeURIComponent(search)}`)
        return response.data
    }
)

export const retryLog = createAsyncThunk(
    'logs/retryLog',
    async (logId) => {
        const response = await api.post(`/logs/${logId}/retry`)
        return { logId, data: response.data }
    }
)

const logSlice = createSlice({
    name: 'logs',
    initialState: {
        list: [],
        pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
        },
        loading: false,
        error: null,
    },
    reducers: {
        setCurrentPage: (state, action) => {
            state.pagination.currentPage = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogs.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchLogs.fulfilled, (state, action) => {
                state.loading = false
                state.list = action.payload.data || []
                if (action.payload.pagination) {
                    state.pagination = {
                        currentPage: action.payload.pagination.page,
                        totalPages: action.payload.pagination.totalPages,
                        totalItems: action.payload.pagination.total
                    }
                }
            })
            .addCase(fetchLogs.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(retryLog.fulfilled, (state, action) => {
                const log = state.list.find(l => l.id === action.payload.logId)
                if (log) {
                    log.status = 'success'
                    log.response = JSON.stringify(action.payload.data)
                }
            })
    },
})

export default logSlice.reducer
