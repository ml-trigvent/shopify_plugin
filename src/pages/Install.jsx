import { useState } from 'react'

export default function Install() {
    const [shop, setShop] = useState('')

    const handleInstall = (e) => {
        e.preventDefault()
        if (!shop) return

        // Normalize shop domain
        let domain = shop.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')
        if (!domain.includes('.')) domain += '.myshopify.com'

        window.location.href = `/api/auth?shop=${domain}`
    }

    return (
        <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="text-center mb-8">
                <div className="w-16 h-16 bg-shopify-green rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                    <span className="text-white font-bold text-2xl">EC</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">Install Easy Client</h1>
                <p className="text-gray-500 mt-2">Enter your Shopify store domain to get started</p>
            </div>

            <form onSubmit={handleInstall} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Store Domain
                    </label>
                    <input
                        type="text"
                        value={shop}
                        onChange={(e) => setShop(e.target.value)}
                        placeholder="my-store.myshopify.com"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-shopify-green focus:border-transparent transition-all"
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={!shop}
                    className="w-full bg-shopify-green text-white py-3 rounded-lg font-semibold hover:bg-shopify-darkgreen transition-all transform active:scale-[0.98] disabled:opacity-50"
                >
                    Install App
                </button>
            </form>

            <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-xs text-gray-400">
                    By installing, you agree to the Easy Client Terms of Service.
                </p>
            </div>
        </div>
    )
}
