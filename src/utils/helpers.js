export const formatDate = (dateString) => {
    if (!dateString) return '—'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(date)
}

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount || 0)
}

export const getShopName = (shopDomain) => {
    if (!shopDomain) return 'Unknown Store'
    return shopDomain.split('.')[0].replace(/-/g, ' ')
}
