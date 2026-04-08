import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getShopName } from '../utils/helpers'

export default function Navbar() {
    const shop = useSelector((state) => state.auth.shop)
    const location = useLocation()

    const links = [
        { to: '/', label: 'Dashboard' },
        { to: '/settings', label: 'Settings' },
        { to: '/logs', label: 'Logs' },
    ]

    return (
        <nav className="bg-shopify-green shadow-md">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">

                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center">
                        <span className="text-shopify-green font-bold text-sm">EC</span>
                    </div>
                    <span className="text-white font-semibold text-base tracking-wide">
                        Easy Client Plugin
                    </span>
                </div>

                {/* Nav Links */}
                <div className="flex items-center gap-1">
                    {links.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${location.pathname === link.to
                                    ? 'bg-white text-shopify-green'
                                    : 'text-white hover:bg-shopify-darkgreen'
                                }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Shop badge */}
                {shop && (
                    <div className="bg-shopify-darkgreen text-white text-xs px-3 py-1.5 rounded-full">
                        {getShopName(shop)}
                    </div>
                )}
            </div>
        </nav>
    )
}
