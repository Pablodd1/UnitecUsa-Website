import calcSheetVol from "lib/getSheetVol"

/**
 * CONTAINER_TOLERANCE
 * Standard logistics typically assumes ~95% usable space due to packing gaps.
 */
const CONTAINER_TOLERANCE = 0.95;

/**
 * Calculate container fill percentage.
 * @param {object} container 
 * @param {string|null} currentItemId
 */
export function containerFillPercent(container, currentItemId = null) {
    const totalVolume =
        (container?.dimension?.length || 0) *
        (container?.dimension?.width || 0) *
        (container?.dimension?.height || 0)

    const usableVolume = totalVolume * CONTAINER_TOLERANCE;

    if (!usableVolume || !Array.isArray(container?.items)) {
        return {
            filledTotal: 0,
            filledCurrent: 0,
            filledOthers: 0,
            availablePercent: 100,
            usableVolume,
        }
    }

    let usedByCurrent = 0
    let usedByOthers = 0

    for (const item of container.items) {
        const productData = item.dimensions || item; // Support variations
        const volResult = calcSheetVol(productData)

        if (!volResult || typeof volResult.value !== "number") continue
        const itemVolume = volResult.value * (item.qty || 1)

        if (item.id === currentItemId) usedByCurrent += itemVolume
        else usedByOthers += itemVolume
    }

    const filledCurrent = (usedByCurrent / usableVolume) * 100
    const filledOthers = (usedByOthers / usableVolume) * 100
    const filledTotal = filledCurrent + filledOthers

    return {
        filledTotal: Math.min(filledTotal, 100),
        filledCurrent: Math.min(filledCurrent, 100),
        filledOthers: Math.min(filledOthers, 100),
        availablePercent: Math.max(100 - filledTotal, 0),
        usableVolume,
        remainingVolume: Math.max(usableVolume - (usedByCurrent + usedByOthers), 0)
    }
}

/**
 * Returns how many more of a specific product can fit in the container.
 * @param {object} container 
 * @param {object} product 
 */
export function calculateRemainingCapacity(container, product) {
    const { remainingVolume } = containerFillPercent(container);
    const itemVol = calcSheetVol(product?.dimensions || product);
    
    if (!itemVol || itemVol.value <= 0) return 0;
    return Math.floor(remainingVolume / itemVol.value);
}
