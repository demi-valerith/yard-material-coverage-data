export interface CoverageByDepth {
  depthInches: number;
  squareFeetPerCubicYard: number;
}

export interface MaterialDensity {
  material: string;
  minimum: number;
  maximum: number;
}

export interface BagConversion {
  bagCubicFeet: number;
  bags: number;
}

export interface YardMaterialCoverageData {
  name: string;
  version: string;
  source: string;
  methodology: string;
  updated: string;
  unitSystem: string;
  coverageByDepth: CoverageByDepth[];
  tonsPerCubicYard: MaterialDensity[];
  bagsPerCubicYard: BagConversion[];
  disclaimer: string;
}

export const coverageData: YardMaterialCoverageData;

export function squareFeetPerCubicYard(depthInches: number): number;
export function cubicYardsRequired(
  squareFeet: number,
  depthInches: number,
): number;
export function findMaterialDensity(
  material: string,
): MaterialDensity | undefined;

export default coverageData;
