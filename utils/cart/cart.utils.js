import calcSheetVol from "lib/getSheetVol"
import { CONTAINER_TYPES } from "./containerTypes"

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
    // Determine container capacity prioritizing fixed volumes from CONTAINER_TYPES
    const containerType = container?.id?.includes('40') ? CONTAINER_TYPES['40ft'] : CONTAINER_TYPES['20ft'];
    const totalVolume = containerType?.volume || 33.0; // Enforce 33m³ or 76m³
    const maxWeight = containerType?.maxWeight || 28000;

    const usableVolume = totalVolume * CONTAINER_TOLERANCE;

    if (!usableVolume || !Array.isArray(container?.items)) {
        return {
            filledTotal: 0,
            filledCurrent: 0,
            filledOthers: 0,
            availablePercent: 100,
            usableVolume,
            weightFilledTotal: 0,
            weightAvailablePercent: 100,
            maxWeight,
            remainingWeight: maxWeight
        }
    }

    let usedByCurrent = 0
    let usedByOthers = 0
    let weightByCurrent = 0
    let weightByOthers = 0

    for (const item of container.items) {
        const productData = item.dimensions || item; // Support variations
        const volResult = calcSheetVol(productData)

        if (!volResult || typeof volResult.value !== "number") continue
        
        // Multiply by itemsPerBox to account for packaging, checking productData as fallback
        const multiplier = item.itemsPerBox || productData.itemsPerBox || 1;
        const itemVolume = volResult.value * multiplier * (item.qty || 1)
        const itemWeight = (productData.weight || 0) * multiplier * (item.qty || 1)

        if (item.id === currentItemId) {
            usedByCurrent += itemVolume;
            weightByCurrent += itemWeight;
        } else {
            usedByOthers += itemVolume;
            weightByOthers += itemWeight;
        }
    }

    const filledCurrent = (usedByCurrent / usableVolume) * 100
    const filledOthers = (usedByOthers / usableVolume) * 100
    const filledTotal = filledCurrent + filledOthers

    const weightFilledCurrent = (weightByCurrent / maxWeight) * 100
    const weightFilledOthers = (weightByOthers / maxWeight) * 100
    const weightFilledTotal = weightFilledCurrent + weightFilledOthers

    return {
        filledTotal: Math.min(filledTotal, 100),
        filledCurrent: Math.min(filledCurrent, 100),
        filledOthers: Math.min(filledOthers, 100),
        availablePercent: Math.max(100 - filledTotal, 0),
        usableVolume,
        remainingVolume: Math.max(usableVolume - (usedByCurrent + usedByOthers), 0),
        weightFilledTotal: Math.min(weightFilledTotal, 100),
        weightAvailablePercent: Math.max(100 - weightFilledTotal, 0),
        maxWeight,
        remainingWeight: Math.max(maxWeight - (weightByCurrent + weightByOthers), 0)
    }
}

/**
 * Returns how many more of a specific product can fit in the container.
 * @param {object} container 
 * @param {object} product 
 */
export function calculateRemainingCapacity(container, product) {
    const { remainingVolume, remainingWeight } = containerFillPercent(container);
    const productData = product?.dimensions || product;
    const itemVol = calcSheetVol(productData);
    
    if (!itemVol || itemVol.value <= 0) return 0;
    
    const maxByVol = Math.floor(remainingVolume / itemVol.value);
    let maxByWeight = Infinity;
    
    if (productData.weight > 0) {
        maxByWeight = Math.floor(remainingWeight / productData.weight);
    }
    
    return Math.min(maxByVol, maxByWeight);
}
