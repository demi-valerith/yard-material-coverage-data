export type MeasurementUnit = "imperial" | "metric";

export interface WidgetMaterial {
  name: string;
  minimum: number;
  maximum: number;
}

export interface MaterialEstimateInput {
  material: string;
  area: number | string;
  depth: number | string;
  unit?: MeasurementUnit | string;
}

export interface MaterialEstimate {
  cubicYards: number;
  cubicMeters: number;
  minimumTons: number;
  maximumTons: number;
  minimumTonnes: number;
  maximumTonnes: number;
}

export interface SourceUrlOptions {
  source?: string | null;
  campaign?: string | null;
}

export const MATERIALS: readonly WidgetMaterial[];
export function normalizeUnit(value: unknown): MeasurementUnit;
export function filterMaterials(value: unknown): readonly WidgetMaterial[];
export function sanitizeAccent(value: unknown): string;
export function buildSourceUrl(options?: SourceUrlOptions): string;
export function estimateMaterial(input: MaterialEstimateInput): MaterialEstimate;
export class YardMaterialCoverageElement extends HTMLElement {
  static observedAttributes: string[];
}

declare global {
  interface HTMLElementTagNameMap {
    "yard-material-coverage": YardMaterialCoverageElement;
  }
}
