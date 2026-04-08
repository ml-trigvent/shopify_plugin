import StatusBadge from './StatusBadge'
import { formatDate } from '../utils/helpers'

export default function LogCard({ log }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4 hover:border-gray-300 transition-colors">
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm text-gray-800">{log.event_type}</span>
                    <StatusBadge status={log.status} />
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
