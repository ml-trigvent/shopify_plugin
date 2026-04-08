export default function StatsCard({ label, value, color = 'text-gray-800' }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex flex-col gap-1">
            <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">{label}</span>
            <span className={`text-2xl font-semibold ${color}`}>{value ?? '—'}</span>
        </div>
    )
}
