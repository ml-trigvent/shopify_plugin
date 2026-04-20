import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveSettings, fetchSettings, clearSaved } from '../store/slices/settingsSlice'

export default function Settings() {
    const dispatch = useDispatch()
    const shop = useSelector((state) => state.auth.shop)
    const { data, saving, saved, error, loading } = useSelector((state) => state.settings)

    const [apiKey, setApiKey] = useState('')
    const [eventPreferences, setEventPreferences] = useState({
        order_placed: true,
        payment_success: true,
        order_shipped: true,
        abandoned_cart_reminder: true,
        checkout_started: true,
        cart_updated: true,
        order_cancelled: true
    })

    useEffect(() => {
        if (shop) dispatch(fetchSettings(shop))
    }, [shop, dispatch])

    useEffect(() => {
        if (data && data.hasApiKey) {
           setApiKey(data.easy_client_api_key || '') // the backend doesn't return full key, actually backend doesn't return apiKey value for security, only `hasApiKey`. We might just leave it blank to not overwrite if they don't enter it, or the backend should not overwrite if it's blank. Actually, wait. The user only re-enters it if they update it. Let's just leave api key blank initially if we don't have it.
        }
        if (data?.eventPreferences) {
           setEventPreferences(prev => ({ ...prev, ...data.eventPreferences }))
        }
    }, [data])

    useEffect(() => {
        if (saved) {
            const t = setTimeout(() => dispatch(clearSaved()), 3000)
            return () => clearTimeout(t)
        }
    }, [saved, dispatch])

    const handleSave = () => {
        if (!shop) return
        dispatch(saveSettings({ shop, easy_client_api_key: apiKey, event_preferences: eventPreferences }))
    }

    const toggleEvent = (eventName) => {
        setEventPreferences(prev => ({
            ...prev,
            [eventName]: !prev[eventName]
        }))
    }

    return (
        <div className="max-w-xl space-y-6">

            <div>
                <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Connect your Easy Client account to enable WhatsApp automation.
                </p>
            </div>

            {/* Store Info */}
            {data && (
                <div className="bg-shopify-lightgreen border border-green-200 rounded-xl p-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Store</span>
                        <span className="font-medium">{data.shopDomain}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className={`font-medium ${data.isActive ? 'text-green-700' : 'text-red-600'}`}>
                            {data.isActive ? 'Active' : 'Inactive'}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Easy Client API Key</span>
                        <span className={`font-medium ${data.hasApiKey ? 'text-green-700' : 'text-yellow-600'}`}>
                            {data.hasApiKey ? 'Configured' : 'Not set'}
                        </span>
                    </div>
                </div>
            )}

            {/* API Key Form */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-4">
                <h2 className="text-base font-semibold text-gray-800">Easy Client API Key</h2>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        API Key
                    </label>
                    <input
                        type="text"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                        placeholder="Enter your Easy Client API key..."
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-shopify-green focus:border-transparent"
                    />
                    <p className="text-xs text-gray-400 mt-1.5">
                        You can find your API key in your Easy Client dashboard.
                    </p>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6">
                    <h2 className="text-base font-semibold text-gray-800 mb-4">Event Preferences</h2>
                    <p className="text-xs text-gray-400 mb-4">Select which events should trigger a message in Easy Client.</p>
                    
                    <div className="space-y-3">
                        {[
                            { key: 'order_placed', label: 'Order Placed' },
                            { key: 'payment_success', label: 'Payment Success' },
                            { key: 'order_shipped', label: 'Order Shipped' },
                            { key: 'order_cancelled', label: 'Order Cancelled' },
                            { key: 'abandoned_cart_reminder', label: 'Abandoned Cart Reminder' },
                            { key: 'checkout_started', label: 'Checkout Started' },
                            { key: 'cart_updated', label: 'Cart Updated' }
                        ].map((event) => (
                            <label key={event.key} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                                <span className="text-sm font-medium text-gray-700">{event.label}</span>
                                <input 
                                    type="checkbox" 
                                    className="w-4 h-4 text-shopify-green rounded border-gray-300 focus:ring-shopify-green"
                                    checked={eventPreferences[event.key] !== false}
                                    onChange={() => toggleEvent(event.key)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-shopify-green text-white py-2.5 rounded-lg text-sm font-medium hover:bg-shopify-darkgreen transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                    {saving ? 'Saving...' : 'Save Settings'}
                </button>

                {saved && (
                    <p className="text-sm text-green-600 text-center font-medium">
                        Settings saved successfully!
                    </p>
                )}

                {error && (
                    <p className="text-sm text-red-600 text-center">{error}</p>
                )}
            </div>

            {/* How it works */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
                <h2 className="text-base font-semibold text-gray-800 mb-3">How it works</h2>
                <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                    <li>Enter your Easy Client API key above</li>
                    <li>Plugin automatically captures all Shopify order events</li>
                    <li>Events are sent to Easy Client in real time</li>
                    <li>Easy Client sends WhatsApp messages automatically</li>
                </ol>
            </div>

        </div>
    )
}
