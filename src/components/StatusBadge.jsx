const STATUS_STYLES = {
    placed: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    shipped: 'bg-blue-100 text-blue-800',
    delivered: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
    received: 'bg-green-100 text-green-800',
    success: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
    skipped: 'bg-gray-100 text-gray-600',
}

export default function StatusBadge({ status }) {
    const style = STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}>
            {status}
        </span>
    )
}
