import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../store/slices/orderSlice'

export function useOrders() {
    const dispatch = useDispatch()
    const shop = useSelector((state) => state.auth.shop)
    const stateOrders = useSelector((state) => state.orders)

    const orders = stateOrders?.list || []
    const stats = stateOrders?.stats
    const loading = stateOrders?.loading
    const error = stateOrders?.error

    useEffect(() => {
        if (shop && orders.length === 0) {
            dispatch(fetchOrders(shop))
        }
    }, [shop, dispatch, orders?.length])

    const refresh = () => {
        if (shop) dispatch(fetchOrders(shop))
    }

    return { orders, stats, loading, error, refresh }
}
