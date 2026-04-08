import StatusBadge from './StatusBadge'
import { formatDate, formatCurrency } from '../utils/helpers'

export default function OrderTable({ orders }) {
    if (!orders || orders.length === 0) {
        return (
            <div className="text-center py-16 text-gray-400">
                <p className="text-4xl mb-3">📦</p>
                <p className="text-sm">No orders yet. Waiting for webhooks...</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {['Order ID', 'Customer', 'Phone', 'Product', 'Price', 'Qty', 'Status', 'Date'].map((h) => (
                            <th
                                key={h}
                                className="px-4 py-3 text-left text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                            >
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 font-medium text-shopify-green whitespace-nowrap">
                                {order.shopify_order_id}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">{order.customer_name || '—'}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-500">{order.customer_phone || '—'}</td>
                            <td className="px-4 py-3 max-w-xs truncate" title={order.product_name}>
                                {order.product_name || '—'}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">
                                {formatCurrency(order.price)}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-center">{order.quantity}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                                <StatusBadge status={order.status} />
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-400 text-xs">
                                {formatDate(order.created_at)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
