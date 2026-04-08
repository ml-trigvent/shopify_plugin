import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogs } from '../store/slices/logSlice'
import LogCard from '../components/LogCard'
import Loader from '../components/Loader'

export default function Logs() {
    const dispatch = useDispatch()
    const shop = useSelector((state) => state.auth.shop)
    const logsState = useSelector((state) => state.logs)
    const logs = logsState?.list || []
    const loading = logsState?.loading
    const error = logsState?.error

    useEffect(() => {
        if (shop) dispatch(fetchLogs(shop))
    }, [shop, dispatch])

    const refresh = () => { if (shop) dispatch(fetchLogs(shop)) }

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
                <button
                    onClick={refresh}
                    className="px-4 py-2 text-sm font-medium text-shopify-green border border-shopify-green rounded-lg hover:bg-shopify-lightgreen transition-colors"
                >
                    Refresh
                </button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {logs.length === 0 && !loading ? (
                <div className="text-center py-16 text-gray-400">
                    <p className="text-4xl mb-3">📋</p>
                    <p className="text-sm">No events yet. Install the plugin on a store to start receiving webhooks.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {logs.map((log) => (
                        <LogCard key={log.id} log={log} />
                    ))}
                </div>
            )}

        </div>
    )
}
