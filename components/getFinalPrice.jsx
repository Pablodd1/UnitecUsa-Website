export default function GetFinalPrice({ basePrice, price, discountPercent, currency = "USD", className = "" }) {
    const rawVal = price !== undefined && price !== null ? price : basePrice;
    const numVal = Number(rawVal);
    if (!rawVal || isNaN(numVal) || numVal <= 0) {
        return (
            <span className={className}>
                FOB / CIF ({currency})
            </span>
        );
    }

    const format = (val) => Number(val).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    return (
        <div>
            {discountPercent && discountPercent > 0 ? (
                <>
                    <span className="line-through text-gray-500 mr-2 opacity-70 text-sm">
                        {format(numVal)} {currency}
                    </span>
                    <span className={className}>
                        {format(numVal * (1 - discountPercent))} {currency}
                    </span>
                </>
            ) : (
                <span className={className}>
                    {format(numVal)} {currency}
                </span>
            )}
        </div>
    );
}
