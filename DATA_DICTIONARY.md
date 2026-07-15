# Data dictionary

All quantities use US customary units.

## coverage.csv

| Field | Type | Unit | Description |
| --- | --- | --- | --- |
| `depth_inches` | number | inches | Installed material depth. |
| `square_feet_per_cubic_yard` | number | square feet | Area covered by one cubic yard at the stated depth. |

## material-density.csv

| Field | Type | Unit | Description |
| --- | --- | --- | --- |
| `material` | string | none | Common material name. |
| `minimum_tons_per_cubic_yard` | number | US short tons per cubic yard | Lower planning value for bulk weight. |
| `maximum_tons_per_cubic_yard` | number | US short tons per cubic yard | Upper planning value for bulk weight. |
| `planning_note` | string | none | Main reason the range can vary. |

## bag-conversions.csv

| Field | Type | Unit | Description |
| --- | --- | --- | --- |
| `bag_cubic_feet` | number | cubic feet | Nominal volume printed on one bag. |
| `bags_per_cubic_yard` | integer | bags | Whole bags needed to equal or exceed 27 cubic feet. |
| `rounding` | string | none | Whether the conversion is exact or rounded up. |

## coverage.json

`coverage.json` combines the three tables and adds dataset-level metadata,
including the version, source, unit system, methodology, update date, and
planning-estimate disclaimer.
