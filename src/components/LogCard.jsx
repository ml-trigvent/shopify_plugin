import { useState } from 'react'
import { useDispatch } from 'react-redux'
import StatusBadge from './StatusBadge'
import { formatDate } from '../utils/helpers'
import { retryLog } from '../store/slices/logSlice'

export default function LogCard({ log }) {
    const dispatch = useDispatch()
    const [retrying, setRetrying] = useState(false)

    const handleRetry = async () => {
        setRetrying(true)
        try {
            await dispatch(retryLog(log.id)).unwrap()
        } catch (e) {
            console.error('Retry failed', e)
        } finally {
            setRetrying(false)
        }
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-gray-300 transition-colors">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-800">{log.event_type}</span>
                    <StatusBadge status={log.status} />
                    {log.status === 'failed' && (
                        <button 
                            onClick={handleRetry} 
                            disabled={retrying}
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded text-gray-700 font-medium transition disabled:opacity-50"
                        >
                            {retrying ? 'Retrying...' : 'Retry'}
                        </button>
                    )}
                </div>
                {log.response && (
                    <p className="text-xs text-gray-400 truncate max-w-xl" title={log.response}>
                        {log.response}
                    </p>
                )}
            </div>
            <span className="text-xs text-gray-400 whitespace-nowrap shrink-0">
                {formatDate(log.created_at)}
            </span>
        </div>
    )
}
