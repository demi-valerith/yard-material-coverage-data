import assert from "node:assert/strict";
import test from "node:test";

import coverageData from "../coverage.json" with { type: "json" };
import { estimateMaterial, MATERIALS } from "../widget.js";

test("widget density values stay aligned with the dataset", () => {
  assert.deepEqual(MATERIALS, coverageData.tonsPerCubicYard.map((entry) => ({
    name: entry.material,
    minimum: entry.minimum,
    maximum: entry.maximum,
  })));
});

test("widget estimates yards and material weight", () => {
  const estimate = estimateMaterial({ material: "Pea gravel", area: 500, depth: 3 });
  assert.equal(estimate.cubicYards, 500 / 108);
  assert.equal(estimate.minimumTons, estimate.cubicYards * 1.25);
  assert.equal(estimate.maximumTons, estimate.cubicYards * 1.4);
});

test("widget rejects unsupported or invalid inputs", () => {
  assert.throws(() => estimateMaterial({ material: "Unknown", area: 500, depth: 3 }), TypeError);
  assert.throws(() => estimateMaterial({ material: "Mulch", area: 0, depth: 3 }), TypeError);
  assert.throws(() => estimateMaterial({ material: "Mulch", area: 500, depth: -1 }), TypeError);
});
