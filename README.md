# Yard Material Coverage Data

Version 1.1.0

Open planning data for common yard and landscape materials:

- square feet covered by one cubic yard at common depths;
- typical tons per cubic yard by material;
- common bag counts per cubic yard.

The files are intended for calculators, supplier resource pages, garden-planning
worksheets, and educational examples. Values are planning estimates; moisture,
gradation, compaction, bag fill, and supplier measurements vary.

## Files

- [`coverage.json`](coverage.json) - structured coverage, density, and bag-size data
- [`coverage.csv`](coverage.csv) - cubic-yard coverage by depth
- [`material-density.csv`](material-density.csv) - typical tons-per-cubic-yard planning ranges
- [`bag-conversions.csv`](bag-conversions.csv) - common bag counts per cubic yard
- [`DATA_DICTIONARY.md`](DATA_DICTIONARY.md) - field definitions and units
- [`METHODOLOGY.md`](METHODOLOGY.md) - formulas, provenance, rounding, and limitations
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

Data and documentation are available under [CC BY 4.0](LICENSE.md). Attribute the
dataset to Yard Material Tools and link to the source chart when republishing it.

## Citation

Use the repository's [`CITATION.cff`](CITATION.cff) metadata when citing a specific
release. A persistent Zenodo DOI will be added after version 1.1.0 is archived.
