import assert from "node:assert/strict";
import test from "node:test";

import coverageData from "../coverage.json" with { type: "json" };
import {
  buildSourceUrl,
  estimateMaterial,
  filterMaterials,
  MATERIALS,
  normalizeUnit,
  sanitizeAccent,
} from "../widget.js";

test("widget density values stay aligned with the dataset", () => {
  assert.deepEqual(MATERIALS, coverageData.tonsPerCubicYard.map((entry) => ({
    name: entry.material,
    minimum: entry.minimum,
    maximum: entry.maximum,
  })));
});

test("keeps the imperial estimate API backward compatible", () => {
  const estimate = estimateMaterial({ material: "Pea gravel", area: 500, depth: 3 });
  assert.equal(estimate.cubicYards, 500 / 108);
  assert.equal(estimate.minimumTons, estimate.cubicYards * 1.25);
  assert.equal(estimate.maximumTons, estimate.cubicYards * 1.4);
  assert.ok(estimate.cubicMeters > 0);
});

test("calculates metric volume and weight", () => {
  const estimate = estimateMaterial({
    material: "crushed-stone",
    area: 50,
    depth: 7.5,
    unit: "metric",
  });

  assert.equal(estimate.cubicMeters, 3.75);
  assert.ok(Math.abs(estimate.cubicYards - 4.904814822375) < 1e-10);
  assert.ok(Math.abs(estimate.minimumTonnes - estimate.minimumTons * 0.90718474) < 1e-10);
});

test("normalizes configuration and falls back safely", () => {
  assert.equal(normalizeUnit("METRIC"), "metric");
  assert.equal(normalizeUnit("yards"), "imperial");
  assert.deepEqual(filterMaterials("mulch, pea-gravel").map(({ name }) => name), ["Pea gravel", "Mulch"]);
  assert.equal(filterMaterials("unknown"), MATERIALS);
  assert.equal(sanitizeAccent("#12aBcD"), "#12aBcD");
  assert.equal(sanitizeAccent("red"), "#ab4c29");
});

test("builds bounded referral URLs without background tracking", () => {
  const sourceUrl = new URL(buildSourceUrl({ source: "wordpress", campaign: "supplier_widget" }));
  assert.equal(sourceUrl.origin, "https://yardmaterialtools.com");
  assert.equal(sourceUrl.searchParams.get("utm_source"), "wordpress");
  assert.equal(sourceUrl.searchParams.get("utm_medium"), "referral");
  assert.equal(sourceUrl.searchParams.get("utm_campaign"), "supplier_widget");

  const fallbackUrl = new URL(buildSourceUrl({ source: "bad value!", campaign: "x".repeat(51) }));
  assert.equal(fallbackUrl.searchParams.get("utm_source"), "embedded_widget");
  assert.equal(fallbackUrl.searchParams.get("utm_campaign"), "coverage_widget");
});

test("rejects unsupported or invalid inputs", () => {
  assert.throws(() => estimateMaterial({ material: "Unknown", area: 500, depth: 3 }), TypeError);
  assert.throws(() => estimateMaterial({ material: "Mulch", area: 0, depth: 3 }), TypeError);
  assert.throws(() => estimateMaterial({ material: "Mulch", area: 500, depth: -1 }), TypeError);
});
