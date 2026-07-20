export interface WidgetMaterial {
  name: string;
  minimum: number;
  maximum: number;
}

export interface MaterialEstimateInput {
  material: string;
  area: number | string;
  depth: number | string;
}

export interface MaterialEstimate {
  cubicYards: number;
  minimumTons: number;
  maximumTons: number;
}

export const MATERIALS: readonly WidgetMaterial[];
export function estimateMaterial(input: MaterialEstimateInput): MaterialEstimate;
export class YardMaterialCoverageElement extends HTMLElement {
  static observedAttributes: string[];
}

declare global {
  interface HTMLElementTagNameMap {
    "yard-material-coverage": YardMaterialCoverageElement;
  }
}
