export default function Loader({ text = 'Loading...' }) {
    return (
        <div className="flex flex-col items-center justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-shopify-green mb-2"></div>
            <p className="text-gray-500 text-sm">{text}</p>
        </div>
    )
}
