import { useEffect } from "react";

export function YardMaterialCoverage({
  material = "Pea gravel",
  materials = "Pea gravel,Crushed stone,River rock",
  area = 500,
  depth = 3,
  unit = "imperial",
  accent = "#ab4c29",
  attribution = true,
}) {
  useEffect(() => {
    import("@demi-valerith/yard-material-coverage-data/widget");
  }, []);

  return (
    <yard-material-coverage
      material={material}
      materials={materials}
      area={area}
      depth={depth}
      unit={unit}
      accent={accent}
      attribution={attribution ? "visible" : "hidden"}
      utm-source="react_example"
      utm-campaign="coverage_widget"
    />
  );
}
