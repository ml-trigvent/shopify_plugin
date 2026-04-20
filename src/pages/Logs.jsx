import { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogs } from '../store/slices/logSlice'
import LogCard from '../components/LogCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'

export default function Logs() {
    const dispatch = useDispatch()
    const shop = useSelector((state) => state.auth.shop)
    const logsState = useSelector((state) => state.logs)
    const logs = logsState?.list || []
    const loading = logsState?.loading
    const error = logsState?.error
    const { currentPage, totalPages } = logsState?.pagination || { currentPage: 1, totalPages: 1 }

    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        if (shop) dispatch(fetchLogs({ shop, page: currentPage, limit: 10, search: searchTerm }))
    }, [shop, currentPage, dispatch]) // omitting searchTerm to only search on enter/button, but wait, usually we want to search on change or button click. Let's do it on button click or refresh.
    
    // Actually, let's fetch when searchTerm changes but debounced, or just when hitting refresh button.
    // Let's stick to fetch explicit.
    
    const refresh = () => { if (shop) dispatch(fetchLogs({ shop, page: 1, limit: 10, search: searchTerm })) }

    const handleSearch = (e) => {
        e.preventDefault()
        if (shop) {
             dispatch({ type: 'logs/setCurrentPage', payload: 1 })
             dispatch(fetchLogs({ shop, page: 1, limit: 10, search: searchTerm }))
        }
    }

    const handlePageChange = (newPage) => {
        dispatch({ type: 'logs/setCurrentPage', payload: newPage })
    }

    if (loading && logs.length === 0) return <Loader text="Loading logs..." />

    return (
        <div className="space-y-5">

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Event Logs</h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        All webhook events received from Shopify
                    </p>
                </div>
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input 
                        type="text" 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search logs..." 
                        className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-shopify-green"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 text-sm font-medium text-shopify-green border border-shopify-green rounded-lg hover:bg-shopify-lightgreen transition-colors"
                    >
                        Search
                    </button>
                    <button
                        type="button"
                        onClick={() => { setSearchTerm(''); setTimeout(refresh, 0); }}
                        className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Clear
                    </button>
                </form>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {logs.length === 0 && !loading ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-sm">No events yet. Install the plugin on a store to start receiving webhooks.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {logs.map((log) => (
                        <LogCard key={log.id} log={log} />
                    ))}
                    
                    {logs.length > 0 && totalPages > 1 && (
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            )}

        </div>
    )
}
