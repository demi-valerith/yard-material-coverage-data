# Methodology and limitations

## Scope

This reference dataset supports early material planning for residential yard,
garden, landscape, and hardscape projects. It is not a supplier quote, laboratory
measurement, engineering specification, or code-compliance source.

## Coverage by depth

One cubic yard contains 27 cubic feet. At a depth of one inch, its theoretical
coverage is:

```text
27 cubic feet / (1 / 12 foot) = 324 square feet
```

For any listed depth:

```text
square feet per cubic yard = 324 / depth in inches
```

The coverage table reports the direct geometric result without a waste,
compaction, or settling allowance.

## Bag conversions

Bag counts divide 27 cubic feet by the nominal bag volume. Fractional results
are rounded up because a purchase estimate requires whole bags. For example,
27 / 2 = 13.5, which is reported as 14 two-cubic-foot bags.

## Material density ranges

The tons-per-cubic-yard values are broad editorial planning ranges maintained by
Yard Material Tools for common retail material categories. They are not the
result of one controlled sampling program. Moisture, particle size, gradation,
organic content, compaction, and supplier terminology can move an actual load
outside a listed range. When a supplier sells by weight, use that supplier's
current conversion for the final order.

## Provenance and maintenance

The canonical human-readable reference, assumptions, and calculator links are
maintained at:

https://yardmaterialtools.com/material-coverage-chart

Versioned files are released from the public GitHub repository. Corrections are
published as a new release so prior cited versions remain reproducible.
