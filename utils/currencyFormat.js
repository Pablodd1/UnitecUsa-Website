/**
 * Format a number into readable currency format based on the active brand.
 * - binw (USA): USD (en-US)
 * - unitec (Colombia): COP (es-CO)
 *
 * @param {number} amount - The number to be formatted.
 * @param {string} brand - The active brand: 'binw' or 'unitec'
 * @returns {string} - The formatted currency string.
 */
export default function formatCurrency(amount, brand = 'binw') {
    if (typeof amount !== 'number' || isNaN(amount)) {
        amount = 0;
    }

    if (brand === 'unitec') {
        // Colombia — COP
        const formatter = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        });
        return formatter.format(amount);
    }

    // Default: USA — USD
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    return formatter.format(amount);
}

/** Backwards-compatible alias for USD formatting */
export function formatCurrencyUSD(amount) {
    return formatCurrency(amount, 'binw');
}
