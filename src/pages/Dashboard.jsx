import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useOrders } from '../hooks/useOrders'
import OrderTable from '../components/OrderTable'
import CartActivity from '../components/CartActivity'
import StatsCard from '../components/StatsCard'
import Loader from '../components/Loader'
import Pagination from '../components/Pagination'
import { formatCurrency } from '../utils/helpers'

const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

export default function Dashboard() {
    const shop = useSelector((state) => state.auth.shop)
    const { orders, stats, loading, error, refresh } = useOrders()

    const [currentPage, setCurrentPage] = useState(1)
    const [pageSize, setPageSize] = useState(5)

    const totalPages = Math.max(1, Math.ceil(orders.length / pageSize))
    const safePage = Math.min(currentPage, totalPages)
    const pagedOrders = orders.slice((safePage - 1) * pageSize, safePage * pageSize)

    const handlePageChange = (page) => {
        setCurrentPage(page)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value))
        setCurrentPage(1)
    }

    if (!shop) {
        return (
            <div className="text-center py-20">
                <p className="text-lg text-gray-500 mb-4">No store connected.</p>
                <a
                    href="/install"
                    className="inline-block bg-shopify-green text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-shopify-darkgreen transition-colors"
                >
                    Connect a Store
                </a>
            </div>
        )
    }

    if (loading) return <Loader text="Loading orders..." />

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                Error: {error}
            </div>
        )
    }

    return (
        <div className="space-y-6">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
                    <p className="text-sm text-gray-500 mt-0.5">Store: {shop}</p>
                </div>
                <button
                    onClick={refresh}
                    className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-shopify-green border border-shopify-green rounded-lg hover:bg-shopify-lightgreen transition-colors w-full sm:w-auto"
                >
                    Refresh
                </button>
            </div>

            {/* Stats Grid */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                    <StatsCard label="Total Orders" value={stats.total} color="text-gray-800" />
                    <StatsCard label="Placed" value={stats.placed} color="text-yellow-600" />
                    <StatsCard label="Paid" value={stats.paid} color="text-green-600" />
                    <StatsCard label="Shipped" value={stats.shipped} color="text-blue-600" />
                    <StatsCard label="Delivered" value={stats.delivered} color="text-purple-600" />
                    <StatsCard label="Revenue" value={formatCurrency(stats.total_revenue)} color="text-shopify-green" />
                </div>
            )}

            {/* Main Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                {/* Orders Table + Pagination */}
                <div className="xl:col-span-3">
                    {/* Table header row */}
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-base font-semibold text-gray-700">
                            Recent Orders
                            {orders.length > 0 && (
                                <span className="ml-2 text-xs font-normal text-gray-400">
                                    ({orders.length} total)
                                </span>
                            )}
                        </h2>

                        {/* Rows per page */}
                        {orders.length > 0 && (
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <span>Rows per page:</span>
                                <select
                                    value={pageSize}
                                    onChange={handlePageSizeChange}
                                    className="border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-shopify-green"
                                >
                                    {PAGE_SIZE_OPTIONS.map((size) => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <OrderTable orders={pagedOrders} />

                    <Pagination
                        currentPage={safePage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>

                {/* Cart Activity */}
                <div className="xl:col-span-1">
                    <h2 className="text-base font-semibold text-gray-700 mb-3">Recent Cart Activity</h2>
                    <CartActivity />
                </div>
            </div>

        </div>
    )
}
