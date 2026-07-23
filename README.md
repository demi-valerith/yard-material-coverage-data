# Yard Material Coverage Data

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.21370505.svg)](https://doi.org/10.5281/zenodo.21370505)

Dataset version 1.1.0. Package and widget version 1.3.0.

Open planning data for common yard and landscape materials:

- square feet covered by one cubic yard at common depths;
- typical tons per cubic yard by material;
- common bag counts per cubic yard.

The files are intended for calculators, supplier resource pages, garden-planning
worksheets, and educational examples. Values are planning estimates; moisture,
gradation, compaction, bag fill, and supplier measurements vary.

## Install

```sh
npm install @demi-valerith/yard-material-coverage-data
```

```js
import coverageData, {
  cubicYardsRequired,
  findMaterialDensity,
  squareFeetPerCubicYard,
} from "@demi-valerith/yard-material-coverage-data";

squareFeetPerCubicYard(3); // 108
cubicYardsRequired(500, 3); // 4.6296...
findMaterialDensity("pea gravel"); // { minimum: 1.25, maximum: 1.4, ... }
console.log(coverageData.bagsPerCubicYard);
```

The package is an ESM module and includes TypeScript declarations. The versioned
JSON file is also available without installation from jsDelivr:

<https://cdn.jsdelivr.net/npm/@demi-valerith/yard-material-coverage-data@1.1.0/coverage.json>

## Embeddable coverage widget

Add the calculator to a supplier resource page, landscaping article, or project guide:

```html
<script
  type="module"
  src="https://cdn.jsdelivr.net/npm/@demi-valerith/yard-material-coverage-data@1.3.0/widget.js"
></script>
<yard-material-coverage
  material="Pea gravel"
  materials="Pea gravel,Crushed stone,River rock"
  area="500"
  depth="3"
  unit="imperial"
  accent="#ab4c29"
  attribution="visible"
  utm-source="supplier_site"
  utm-campaign="coverage_widget"
></yard-material-coverage>
```

The widget is responsive, dependency-free, and supports:

- `material`: initial material name or hyphenated slug;
- `materials`: comma-separated material allowlist;
- `area` and `depth`: initial positive numeric values;
- `unit`: `imperial` for square feet, inches, cubic yards, and short tons, or
  `metric` for square meters, centimeters, cubic meters, and metric tonnes;
- `accent`: six-digit hexadecimal result accent color;
- `attribution`: `visible` by default or `hidden`;
- `utm-source` and `utm-campaign`: bounded identifiers added to the optional
  source link.

See the runnable [plain HTML, React, Astro, and WordPress examples](examples/).

### Privacy and attribution

The package performs no analytics, storage, cookies, or background network
requests. When attribution is visible, UTM parameters are transmitted only if a
visitor clicks the source link.

The source link is optional for the MIT-licensed widget code. Republishing the
CC BY 4.0 dataset or its documentation still requires appropriate credit and a
link to the source chart. The WordPress plugin keeps public attribution opt-in
to comply with WordPress.org directory rules.

## Files

- [`coverage.json`](coverage.json) - structured coverage, density, and bag-size data
- [`coverage.csv`](coverage.csv) - cubic-yard coverage by depth
- [`material-density.csv`](material-density.csv) - typical tons-per-cubic-yard planning ranges
- [`bag-conversions.csv`](bag-conversions.csv) - common bag counts per cubic yard
- [`DATA_DICTIONARY.md`](DATA_DICTIONARY.md) - field definitions and units
- [`METHODOLOGY.md`](METHODOLOGY.md) - formulas, provenance, rounding, and limitations
- [`CHECKSUMS.txt`](CHECKSUMS.txt) - SHA-256 checksums for release files
- [`index.html`](index.html) - public reference page for GitHub Pages

## Formula

```text
square feet covered by 1 cubic yard = 324 / depth in inches
cubic yards required = square feet * depth in inches / 324
```

## Source and calculators

Full tables, printable assets, assumptions, and project calculators are available
from the [Yard Material Coverage Chart](https://yardmaterialtools.com/material-coverage-chart).

Useful project tools:

- [Gravel calculator](https://yardmaterialtools.com/gravel-calculator)
- [Topsoil calculator](https://yardmaterialtools.com/top-soil-calculator)
- [Mulch calculator](https://yardmaterialtools.com/mulch-calculator)
- [Cubic yards to tons calculator](https://yardmaterialtools.com/cubic-yards-to-tons-calculator)

## License

Data and documentation are available under CC BY 4.0. JavaScript, TypeScript
declarations, tests, and examples are available under MIT. See [LICENSE.md](LICENSE.md).

## Citation

Use the repository's [`CITATION.cff`](CITATION.cff) metadata when citing a specific
release.

- Version 1.1.0 DOI: <https://doi.org/10.5281/zenodo.21370505>
- All-version concept DOI: <https://doi.org/10.5281/zenodo.21370504>

Suggested citation:

> Yard Material Tools. (2026). Yard Material Coverage Data (Version 1.1.0)
> [Data set]. Zenodo. https://doi.org/10.5281/zenodo.21370505
