export default function Pagination({ currentPage, totalPages, onPageChange }) {
    if (!totalPages) return null


    const pages = []
    const delta = 2 // pages to show around current

    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - delta && i <= currentPage + delta)
        ) {
            pages.push(i)
        } else if (
            i === currentPage - delta - 1 ||
            i === currentPage + delta + 1
        ) {
            pages.push('...')
        }
    }

    // Remove duplicate ellipses
    const dedupedPages = pages.filter((p, idx) => p !== '...' || pages[idx - 1] !== '...')

    return (
        <div className="flex items-center justify-between mt-4 px-1">
            {/* Info */}
            <p className="text-xs text-gray-400">
                Page <span className="font-medium text-gray-600">{currentPage}</span> of{' '}
                <span className="font-medium text-gray-600">{totalPages}</span>
            </p>

            {/* Controls */}
            <div className="flex items-center gap-1">
                {/* Prev */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="Previous page"
                >
                    ‹
                </button>

                {/* Page numbers */}
                {dedupedPages.map((page, idx) =>
                    page === '...' ? (
                        <span
                            key={`ellipsis-${idx}`}
                            className="w-8 h-8 flex items-center justify-center text-gray-400 text-xs"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md text-xs font-medium transition-colors border ${
                                page === currentPage
                                    ? 'bg-shopify-green text-white border-shopify-green shadow-sm'
                                    : 'border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 text-gray-500 text-sm hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    title="Next page"
                >
                    ›
                </button>
            </div>
        </div>
    )
}
