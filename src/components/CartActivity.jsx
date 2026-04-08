import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchLogs } from '../store/slices/logSlice'
import { formatDate } from '../utils/helpers'

export default function CartActivity() {
    const dispatch = useDispatch()
    const shop = useSelector((state) => state.auth.shop)
    const logsState = useSelector((state) => state.logs)
    const logs = logsState?.list || []
    const loading = logsState?.loading

    useEffect(() => {
        if (shop && logs.length === 0) {
            dispatch(fetchLogs(shop))
        }
    }, [shop, dispatch, logs.length])

    const cartEvents = logs.filter(l =>
        l.event_type === 'cart_created' || l.event_type === 'cart_updated'
    ).slice(0, 5)

    if (loading && logs.length === 0) return <p className="text-sm text-gray-500">Loading...</p>

    if (cartEvents.length === 0) {
        return (
            <div className="bg-gray-50 rounded-xl p-6 text-center border border-dashed border-gray-300">
                <p className="text-sm text-gray-500">No cart activity yet.</p>
            </div>
        )
    }

    return (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="divide-y divide-gray-100">
                {cartEvents.map((event) => {
                    let payload = {}
                    try {
                        const rawPayload = event.payload;
                        payload = typeof rawPayload === 'string' ? JSON.parse(rawPayload) : rawPayload;
                        if (typeof payload === 'string') {
                            payload = JSON.parse(payload);
                        }
                    } catch (e) {
                        console.error('Failed to parse payload', e)
                    }

                    const safePayload = payload || {};
                    let lineItems = safePayload.line_items || [];
                    let products = lineItems.map(i => i.title || i.product_title).filter(Boolean).join(', ');
                    let totalPrice = lineItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * (item.quantity || 1)), 0);
                    let quantity = lineItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

                    if (products === '' && (safePayload.product || safePayload.products)) {
                        products = safePayload.product || safePayload.products || '';
                        totalPrice = parseFloat(safePayload.price || 0);
                        quantity = safePayload.quantity || 1;
                    }

                    return (
                        <div key={event.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-semibold text-gray-900 truncate" title={products}>
                                        {products || 'Items added to cart'}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs font-medium text-shopify-green bg-shopify-lightgreen px-2 py-0.5 rounded-full">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {quantity} {quantity === 1 ? 'item' : 'items'}
                                        </span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-gray-400 whitespace-nowrap mt-1">
                                    {formatDate(event.created_at)}
                                </span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
