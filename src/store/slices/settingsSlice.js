import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../services/api'

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async (shop) => {
        const response = await api.get(`/settings?shop=${shop}`)
        return response.data
    }
)

export const saveSettings = createAsyncThunk(
    'settings/saveSettings',
    async ({ shop, easy_client_api_key, event_preferences }) => {
        const response = await api.post('/settings', { shop, easy_client_api_key, event_preferences })
        return response.data
    }
)

const settingsSlice = createSlice({
    name: 'settings',
    initialState: {
        data: null,
        loading: false,
        saving: false,
        saved: false,
        error: null,
    },
    reducers: {
        clearSaved: (state) => {
            state.saved = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSettings.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false
                // Extract data from { success: true, data: { ... } }
                state.data = action.payload.data || null
            })
            .addCase(fetchSettings.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(saveSettings.pending, (state) => {
                state.saving = true
                state.error = null
            })
            .addCase(saveSettings.fulfilled, (state) => {
                state.saving = false
                state.saved = true
            })
            .addCase(saveSettings.rejected, (state, action) => {
                state.saving = false
                state.error = action.error.message
            })
    },
})

export const { clearSaved } = settingsSlice.actions
export default settingsSlice.reducer
