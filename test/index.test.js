import assert from "node:assert/strict";
import test from "node:test";

import coverageData, {
  cubicYardsRequired,
  findMaterialDensity,
  squareFeetPerCubicYard,
} from "../index.js";

test("exports the versioned coverage dataset", () => {
  assert.equal(coverageData.version, "1.1.0");
  assert.equal(coverageData.coverageByDepth.length, 6);
});

test("calculates coverage and cubic yards", () => {
  assert.equal(squareFeetPerCubicYard(3), 108);
  assert.equal(cubicYardsRequired(324, 3), 3);
});

test("finds density ranges without case sensitivity", () => {
  assert.deepEqual(findMaterialDensity(" pea GRAVEL "), {
    material: "Pea gravel",
    minimum: 1.25,
    maximum: 1.4,
  });
  assert.equal(findMaterialDensity("unknown"), undefined);
});

test("rejects invalid calculator inputs", () => {
  assert.throws(() => squareFeetPerCubicYard(0), TypeError);
  assert.throws(() => cubicYardsRequired(Number.NaN, 3), TypeError);
  assert.throws(() => findMaterialDensity(""), TypeError);
});
