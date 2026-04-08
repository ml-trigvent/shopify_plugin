import { useSelector } from 'react-redux'

export function useAuth() {
    const { shop, isAuthenticated } = useSelector((state) => state.auth)
    return { shop, isAuthenticated }
}
