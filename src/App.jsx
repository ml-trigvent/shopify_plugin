import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { setShop } from './store/slices/authSlice'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Settings from './pages/Settings'
import Logs from './pages/Logs'
import Install from './pages/Install'

export default function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const shop = params.get('shop')
        if (shop) {
            dispatch(setShop(shop))
            localStorage.setItem('shop', shop)
        } else {
            const saved = localStorage.getItem('shop')
            if (saved) dispatch(setShop(saved))
        }
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 py-6">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/logs" element={<Logs />} />
                        <Route path="/install" element={<Install />} />
                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    )
}
