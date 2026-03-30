export const CONTAINER_TYPES = {
  "20ft": {
    id: "20ft",
    name: "20ft Container",
    nameEs: "Contenedor 20ft",
    volume: 33.2,
    volumeUnit: "m³",
    maxWeight: 28000,
    weightUnit: "kg",
    dimensions: {
      length: 5898,
      width: 2352,
      height: 2393
    },
    dimensionsUnit: "mm"
  },
  "40ft": {
    id: "40ft",
    name: "40ft Container",
    nameEs: "Contenedor 40ft",
    volume: 67.7,
    volumeUnit: "m³",
    maxWeight: 28000,
    weightUnit: "kg",
    dimensions: {
      length: 12032,
      width: 2352,
      height: 2393
    },
    dimensionsUnit: "mm"
  }
}

export const EFFICIENCY_THRESHOLD = 0.95

export function getContainerType(id) {
  return CONTAINER_TYPES[id] || null
}

export function getAllContainerTypes() {
  return Object.values(CONTAINER_TYPES)
}
