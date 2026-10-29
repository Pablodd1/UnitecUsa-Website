import { CONTAINER_TYPES, EFFICIENCY_THRESHOLD } from "./containerTypes";

const EXPERIENCE_CART_KEY = "__experience_cart__";

let experienceCart = {
  selectedContainer: null,
  items: []
};

export { EFFICIENCY_THRESHOLD };

export function initExperienceCart() {
  if (typeof window === "undefined") return;

  try {
    const stored = localStorage.getItem(EXPERIENCE_CART_KEY);
    const parsed = stored ? JSON.parse(stored) : null;
    experienceCart = parsed || { selectedContainer: null, items: [] };
  } catch {
    experienceCart = { selectedContainer: null, items: [] };
  }
}

function persist() {
  if (typeof window === "undefined") return;
  localStorage.setItem(EXPERIENCE_CART_KEY, JSON.stringify(experienceCart));
}

export function getExperienceCart() {
  return experienceCart;
}

export function getSelectedContainer() {
  return experienceCart.selectedContainer;
}

export function selectContainer(containerType) {
  const containerConfig = CONTAINER_TYPES[containerType];
  if (!containerConfig) throw new Error("Invalid container type");

  experienceCart.selectedContainer = {
    type: containerType,
    ...containerConfig,
    usedVolume: 0,
    usedWeight: 0
  };
  persist();
}

export function clearContainerSelection() {
  experienceCart.selectedContainer = null;
  experienceCart.items = [];
  persist();
}

export function calculateItemVolume(productOrDimensions) {
  if (!productOrDimensions) return 0;
  // Prioritize Section 2 container_volume_m3_per_unit if passed a product object
  if (typeof productOrDimensions.container_volume_m3_per_unit === "number" && productOrDimensions.container_volume_m3_per_unit > 0) {
    return productOrDimensions.container_volume_m3_per_unit;
  }
  const metric = productOrDimensions.metric || productOrDimensions.dimensions?.metric;
  if (!metric) return 0;
  const { length, width, thickness } = metric;
  const lengthM = (length || 0) / 100;
  const widthM = (width || 0) / 100;
  const thicknessM = (thickness || 0) / 1000;
  return lengthM * widthM * thicknessM;
}

export function calculateItemWeight(product) {
  if (!product) return 0;
  if (typeof product.weight === "number" && product.weight > 0) return product.weight;
  if (typeof product.weight_kg_per_box === "number" && product.weight_kg_per_box > 0) {
    const units = product.units_per_box || product.itemsPerBox || 1;
    return product.weight_kg_per_box / units;
  }
  return 0;
}

export function addItemToCart(product, qty = 1) {
  if (!experienceCart.selectedContainer) {
    throw new Error("No container selected");
  }

  const unitVol = calculateItemVolume(product);
  const unitWeight = calculateItemWeight(product);
  const itemVolume = unitVol * qty;
  const itemWeight = unitWeight * qty;

  const existingIndex = experienceCart.items.findIndex(i => i.id === product.id);

  if (existingIndex >= 0) {
    const oldQty = experienceCart.items[existingIndex].qty;
    const volumeDiff = unitVol * (qty - oldQty);
    const weightDiff = unitWeight * (qty - oldQty);

    experienceCart.items[existingIndex].qty = qty;

    experienceCart.selectedContainer.usedVolume += volumeDiff;
    experienceCart.selectedContainer.usedWeight += weightDiff;
  } else {
    experienceCart.items.push({
      ...product,
      id: product.id,
      slug: product.slug,
      name: product.name,
      qty,
      type: "product",
      dimensions: product.dimensions,
      volume: unitVol,
      m2_per_box: product.m2_per_box,
      weight: unitWeight,
      stackable: product.stackable ?? true
    });

    experienceCart.selectedContainer.usedVolume += itemVolume;
    experienceCart.selectedContainer.usedWeight += itemWeight;
  }

  persist();
}

export function removeItemFromCart(productId) {
  const itemIndex = experienceCart.items.findIndex(i => i.id === productId);
  if (itemIndex < 0) return;

  const item = experienceCart.items[itemIndex];
  const itemVolume = item.volume * item.qty;
  const itemWeight = (item.weight || 0) * item.qty;

  experienceCart.selectedContainer.usedVolume -= itemVolume;
  experienceCart.selectedContainer.usedWeight -= itemWeight;

  experienceCart.items.splice(itemIndex, 1);
  persist();
}

export function updateItemQuantity(productId, newQty) {
  const item = experienceCart.items.find(i => i.id === productId);
  if (!item) return;

  const oldQty = item.qty;
  const qtyDiff = newQty - oldQty;

  if (qtyDiff === 0) return;

  const volumeDiff = item.volume * qtyDiff;
  const weightDiff = (item.weight || 0) * qtyDiff;

  if (newQty <= 0) {
    removeItemFromCart(productId);
    return;
  }

  item.qty = newQty;
  experienceCart.selectedContainer.usedVolume += volumeDiff;
  experienceCart.selectedContainer.usedWeight += weightDiff;

  persist();
}

export function getVolumeStats() {
  if (!experienceCart.selectedContainer) {
    return { used: 0, total: 0, percent: 0, remaining: 0, needed: 0 };
  }

  const { volume } = experienceCart.selectedContainer;
  const used = experienceCart.selectedContainer.usedVolume || 0;
  const percent = (used / volume) * 100;
  const remaining = Math.max(volume - used, 0);

  const neededFor95 = volume * EFFICIENCY_THRESHOLD;
  const needed = Math.max(neededFor95 - used, 0);

  return { used, total: volume, percent, remaining, needed };
}

export function getWeightStats() {
  if (!experienceCart.selectedContainer) {
    return { used: 0, total: 0, percent: 0, remaining: 0 };
  }

  const { maxWeight } = experienceCart.selectedContainer;
  const used = experienceCart.selectedContainer.usedWeight || 0;
  const percent = (used / maxWeight) * 100;
  const remaining = Math.max(maxWeight - used, 0);

  return { used, total: maxWeight, percent, remaining };
}

export function isReadyForCheckout() {
  const volStats = getVolumeStats();
  return volStats.percent >= (EFFICIENCY_THRESHOLD * 100);
}

export function clearExperienceCart() {
  experienceCart = { selectedContainer: null, items: [] };
  persist();
}
