import calcSheetVol from "lib/getSheetVol";
import { CONTAINER_TYPES } from "./containerTypes";

/**
 * CONTAINER_TOLERANCE
 * Standard logistics typically assumes ~95% usable space due to packing gaps.
 */
const CONTAINER_TOLERANCE = 0.95;

/**
 * Resolve product unit volume (m³) prioritizing Section 2 container_volume_m3_per_unit.
 */
export function getUnitVolumeM3(item) {
    if (!item) return 0;
    if (typeof item.container_volume_m3_per_unit === "number" && item.container_volume_m3_per_unit > 0) {
        return item.container_volume_m3_per_unit;
    }
    const productData = item.dimensions || item;
    const volResult = calcSheetVol(productData);
    return volResult && typeof volResult.value === "number" ? volResult.value : 0;
}

/**
 * Resolve product weight dynamically with support for Section 2 weight_kg_per_box / metric unit conversions.
 */
export function getUnitWeight(item) {
    if (!item) return 0;
    if (typeof item.weight === "number" && item.weight > 0) {
        return item.weight;
    }
    if (typeof item.weight_kg_per_box === "number" && item.weight_kg_per_box > 0) {
        const units = item.units_per_box || item.itemsPerBox || 1;
        return Number((item.weight_kg_per_box / units).toFixed(3));
    }
    const productData = item.dimensions || item;
    let unitWeight = productData.weight || item.weight || 0;
    if (!unitWeight) {
        const weightPerSqm = productData.weightPerSqm || item.weightPerSqm || 0;
        if (weightPerSqm) {
            const metric = productData.metric || productData.dimensions?.metric;
            if (metric) {
                const w = metric.width || 0;
                const l = metric.length || 0;
                const wUnit = (metric.widthUnit || '').toLowerCase().trim();
                const lUnit = (metric.lengthUnit || '').toLowerCase().trim();
                const widthInMeters = wUnit === 'cm' ? w / 100 : wUnit === 'mm' ? w / 1000 : w;
                const lengthInMeters = lUnit === 'cm' ? l / 100 : lUnit === 'mm' ? l / 1000 : l;
                const areaSqm = widthInMeters * lengthInMeters;
                unitWeight = parseFloat((weightPerSqm * areaSqm).toFixed(3));
            }
        }
    }
    return unitWeight || 0;
}

/**
 * Calculate container fill percentage using Section 2 per-product volume and weight fields.
 * @param {object} container 
 * @param {string|null} currentItemId
 */
export function containerFillPercent(container, currentItemId = null) {
    const containerType = container?.id?.includes('40') ? CONTAINER_TYPES['40ft'] : CONTAINER_TYPES['20ft'];
    const totalVolume = containerType?.volume || 33.0;
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
            weightFilledCurrent: 0,
            weightFilledOthers: 0,
            weightAvailablePercent: 100,
            maxWeight,
            remainingWeight: maxWeight,
            totalM2: 0,
        };
    }

    let usedByCurrent = 0;
    let usedByOthers = 0;
    let weightByCurrent = 0;
    let weightByOthers = 0;
    let totalM2 = 0;

    for (const item of container.items) {
        const productData = item.dimensions || item;
        const unitVolM3 = getUnitVolumeM3(item);
        const multiplier = item.units_per_box || item.itemsPerBox || productData.itemsPerBox || 1;
        const unitWeight = getUnitWeight(item);
        const qty = item.qty || 1;

        const itemWeight = unitWeight * multiplier * qty;
        const itemVolume = unitVolM3 * multiplier * qty;

        if (item.m2_per_box && item.m2_per_box > 0) {
            totalM2 += item.m2_per_box * qty;
        } else if (item.m2_per_unit && item.m2_per_unit > 0) {
            totalM2 += item.m2_per_unit * multiplier * qty;
        }

        if (item.id === currentItemId) {
            usedByCurrent += itemVolume;
            weightByCurrent += itemWeight;
        } else {
            usedByOthers += itemVolume;
            weightByOthers += itemWeight;
        }
    }

    const filledCurrent = (usedByCurrent / usableVolume) * 100;
    const filledOthers = (usedByOthers / usableVolume) * 100;
    const filledTotal = filledCurrent + filledOthers;

    const weightFilledCurrent = (weightByCurrent / maxWeight) * 100;
    const weightFilledOthers = (weightByOthers / maxWeight) * 100;
    const weightFilledTotal = weightFilledCurrent + weightFilledOthers;

    return {
        filledTotal: Math.min(filledTotal, 100),
        filledCurrent: Math.min(filledCurrent, 100),
        filledOthers: Math.min(filledOthers, 100),
        availablePercent: Math.max(100 - filledTotal, 0),
        usableVolume,
        remainingVolume: Math.max(usableVolume - (usedByCurrent + usedByOthers), 0),
        totalM2: Number(totalM2.toFixed(2)),
        weightFilledTotal: Math.min(weightFilledTotal, 100),
        weightFilledCurrent: Math.min(weightFilledCurrent, 100),
        weightFilledOthers: Math.min(weightFilledOthers, 100),
        weightAvailablePercent: Math.max(100 - weightFilledTotal, 0),
        maxWeight,
        remainingWeight: Math.max(maxWeight - (weightByCurrent + weightByOthers), 0),
    };
}

/**
 * Returns how many more of a specific product can fit in the container.
 * @param {object} container 
 * @param {object} product 
 */
export function calculateRemainingCapacity(container, product) {
    const { remainingVolume, remainingWeight } = containerFillPercent(container);
    const unitVol = getUnitVolumeM3(product);

    if (!unitVol || unitVol <= 0) return 0;

    const maxByVol = Math.floor(remainingVolume / unitVol);
    let maxByWeight = Infinity;

    const unitWeight = getUnitWeight(product);
    if (unitWeight > 0) {
        maxByWeight = Math.floor(remainingWeight / unitWeight);
    }

    return Math.min(maxByVol, maxByWeight);
}
