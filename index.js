import coverageData from "./coverage.json" with { type: "json" };

function requirePositiveNumber(value, name) {
  if (!Number.isFinite(value) || value <= 0) {
    throw new TypeError(`${name} must be a positive finite number`);
  }
}

export { coverageData };

export function squareFeetPerCubicYard(depthInches) {
  requirePositiveNumber(depthInches, "depthInches");
  return 324 / depthInches;
}

export function cubicYardsRequired(squareFeet, depthInches) {
  requirePositiveNumber(squareFeet, "squareFeet");
  requirePositiveNumber(depthInches, "depthInches");
  return (squareFeet * depthInches) / 324;
}

export function findMaterialDensity(material) {
  if (typeof material !== "string" || material.trim() === "") {
    throw new TypeError("material must be a non-empty string");
  }

  const normalized = material.trim().toLowerCase();
  return coverageData.tonsPerCubicYard.find(
    (entry) => entry.material.toLowerCase() === normalized,
  );
}

export default coverageData;
