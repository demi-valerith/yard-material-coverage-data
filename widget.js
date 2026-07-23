// SPDX-License-Identifier: MIT

const TAG_NAME = "yard-material-coverage";
const SOURCE_URL = "https://yardmaterialtools.com/material-coverage-chart";
const CUBIC_METERS_TO_CUBIC_YARDS = 1.3079506193;
const SHORT_TONS_TO_METRIC_TONNES = 0.90718474;

export const MATERIALS = Object.freeze([
  { name: "Pea gravel", minimum: 1.25, maximum: 1.4 },
  { name: "Crushed stone", minimum: 1.35, maximum: 1.55 },
  { name: "River rock", minimum: 1.35, maximum: 1.6 },
  { name: "Topsoil", minimum: 0.9, maximum: 1.3 },
  { name: "Compost", minimum: 0.45, maximum: 0.8 },
  { name: "Mulch", minimum: 0.25, maximum: 0.5 },
  { name: "Sand", minimum: 1.25, maximum: 1.5 },
  { name: "Fill dirt", minimum: 1, maximum: 1.4 },
]);

function normalizeMaterialName(value) {
  return typeof value === "string" ? value.trim().toLowerCase().replaceAll("-", " ") : "";
}

export function normalizeUnit(value) {
  return typeof value === "string" && value.trim().toLowerCase() === "metric" ? "metric" : "imperial";
}

export function filterMaterials(value) {
  if (typeof value !== "string" || value.trim() === "") return MATERIALS;

  const requested = new Set(value.split(",").map(normalizeMaterialName).filter(Boolean));
  const filtered = MATERIALS.filter((entry) => requested.has(normalizeMaterialName(entry.name)));
  return filtered.length > 0 ? Object.freeze(filtered) : MATERIALS;
}

export function sanitizeAccent(value) {
  return typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value.trim()) ? value.trim() : "#ab4c29";
}

function sanitizeCampaignValue(value, fallback) {
  const normalized = typeof value === "string" ? value.trim() : "";
  return /^[a-z0-9][a-z0-9_-]{0,49}$/i.test(normalized) ? normalized : fallback;
}

export function buildSourceUrl({ source, campaign } = {}) {
  const url = new URL(SOURCE_URL);
  url.searchParams.set("utm_source", sanitizeCampaignValue(source, "embedded_widget"));
  url.searchParams.set("utm_medium", "referral");
  url.searchParams.set("utm_campaign", sanitizeCampaignValue(campaign, "coverage_widget"));
  return url.toString();
}

export function estimateMaterial({ material, area, depth, unit = "imperial" }) {
  const density = MATERIALS.find(
    (entry) => normalizeMaterialName(entry.name) === normalizeMaterialName(material),
  );
  const numericArea = Number(area);
  const numericDepth = Number(depth);
  const normalizedUnit = normalizeUnit(unit);

  if (!density) throw new TypeError("material must match a supported material");
  if (!Number.isFinite(numericArea) || numericArea <= 0) {
    throw new TypeError("area must be a positive finite number");
  }
  if (!Number.isFinite(numericDepth) || numericDepth <= 0) {
    throw new TypeError("depth must be a positive finite number");
  }

  const cubicMeters =
    normalizedUnit === "metric"
      ? (numericArea * numericDepth) / 100
      : ((numericArea * numericDepth) / 324) / CUBIC_METERS_TO_CUBIC_YARDS;
  const cubicYards =
    normalizedUnit === "metric"
      ? cubicMeters * CUBIC_METERS_TO_CUBIC_YARDS
      : (numericArea * numericDepth) / 324;
  const minimumTons = cubicYards * density.minimum;
  const maximumTons = cubicYards * density.maximum;

  return {
    cubicYards,
    cubicMeters,
    minimumTons,
    maximumTons,
    minimumTonnes: minimumTons * SHORT_TONS_TO_METRIC_TONNES,
    maximumTonnes: maximumTons * SHORT_TONS_TO_METRIC_TONNES,
  };
}

const BaseElement = globalThis.HTMLElement ?? class {};

export class YardMaterialCoverageElement extends BaseElement {
  static observedAttributes = [
    "material",
    "area",
    "depth",
    "unit",
    "accent",
    "materials",
    "attribution",
    "utm-source",
    "utm-campaign",
  ];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const availableMaterials = filterMaterials(this.getAttribute("materials"));
    const requestedMaterial = this.getAttribute("material");
    const selectedMaterial =
      availableMaterials.find(
        (entry) => normalizeMaterialName(entry.name) === normalizeMaterialName(requestedMaterial),
      ) ?? availableMaterials[0];
    const unit = normalizeUnit(this.getAttribute("unit"));
    const area = Number(this.getAttribute("area")) > 0 ? Number(this.getAttribute("area")) : unit === "metric" ? 50 : 500;
    const depth = Number(this.getAttribute("depth")) > 0 ? Number(this.getAttribute("depth")) : unit === "metric" ? 7.5 : 3;
    const accent = sanitizeAccent(this.getAttribute("accent"));
    const showAttribution = this.getAttribute("attribution") !== "hidden";
    const sourceUrl = buildSourceUrl({
      source: this.getAttribute("utm-source"),
      campaign: this.getAttribute("utm-campaign"),
    });
    const shadow = this.shadowRoot ?? this.attachShadow({ mode: "open" });
    const areaUnit = unit === "metric" ? "m\u00B2" : "sq ft";
    const depthUnit = unit === "metric" ? "cm" : "in";

    shadow.innerHTML = `
      <style>
        :host {
          --ymc-accent: ${accent};
          color: #1b2420;
          display: block;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          max-width: 420px;
          min-width: 0;
          width: 100%;
        }
        * { box-sizing: border-box; }
        .tool {
          background: #ffffff;
          border: 1px solid #c9c4b3;
          border-radius: 6px;
          box-shadow: 0 8px 28px rgba(22, 32, 28, 0.1);
          overflow: hidden;
        }
        header {
          background: #16201c;
          border-bottom: 3px solid #cdae5b;
          color: #ffffff;
          padding: 18px 20px 16px;
        }
        .kicker {
          color: #d9c98e;
          font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          margin: 0 0 6px;
          text-transform: uppercase;
        }
        h2 { font-size: 20px; line-height: 1.2; margin: 0; }
        form { display: grid; gap: 14px; padding: 18px 20px 20px; }
        label {
          color: #354039;
          display: grid;
          font-size: 13px;
          font-weight: 700;
          gap: 5px;
        }
        input, select {
          background: #faf8f2;
          border: 1px solid #b9b4a5;
          border-radius: 4px;
          color: #1b2420;
          font: inherit;
          min-height: 42px;
          padding: 8px 10px;
          width: 100%;
        }
        input:focus, select:focus { outline: 3px solid color-mix(in srgb, var(--ymc-accent) 28%, transparent); outline-offset: 1px; }
        .measurements { display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
        .result {
          background: #f3f0e8;
          border-left: 4px solid var(--ymc-accent);
          display: grid;
          gap: 10px;
          padding: 14px 15px;
        }
        .result-row { align-items: baseline; display: flex; gap: 10px; justify-content: space-between; }
        .result-label { color: #586159; font-size: 12px; font-weight: 700; text-transform: uppercase; }
        output {
          color: #163029;
          font-family: ui-monospace, "SFMono-Regular", Consolas, monospace;
          font-size: 17px;
          font-variant-numeric: tabular-nums;
          font-weight: 800;
          text-align: right;
        }
        .note { color: #646d64; font-size: 11px; line-height: 1.45; margin: 0; }
        footer {
          background: #faf8f2;
          border-top: 1px solid #dcd8cb;
          color: #586159;
          font-size: 11px;
          padding: 10px 20px;
          text-align: right;
        }
        a { color: #1f4439; font-weight: 800; text-underline-offset: 2px; }
        @media (max-width: 340px) {
          .measurements { grid-template-columns: 1fr; }
          .result-row { align-items: flex-start; flex-direction: column; gap: 2px; }
          output { text-align: left; }
        }
      </style>
      <section class="tool" aria-labelledby="ymc-title">
        <header>
          <p class="kicker">Planning estimate</p>
          <h2 id="ymc-title">Yard material coverage</h2>
        </header>
        <form>
          <label>
            Material
            <select name="material">
              ${availableMaterials.map(
                (entry) => `<option${entry.name === selectedMaterial.name ? " selected" : ""}>${entry.name}</option>`,
              ).join("")}
            </select>
          </label>
          <div class="measurements">
            <label>
              Area (${areaUnit})
              <input name="area" type="number" min="0.01" step="any" inputmode="decimal" value="${area}">
            </label>
            <label>
              Depth (${depthUnit})
              <input name="depth" type="number" min="0.01" step="any" inputmode="decimal" value="${depth}">
            </label>
          </div>
          <div class="result" aria-live="polite">
            <div class="result-row">
              <span class="result-label">Material volume</span>
              <output name="volume"></output>
            </div>
            <div class="result-row">
              <span class="result-label">Typical weight</span>
              <output name="weight"></output>
            </div>
          </div>
          <p class="note">Planning estimate only. Moisture, compaction, gradation, and supplier measurements vary.</p>
        </form>
        ${showAttribution ? `<footer>Source: <a href="${sourceUrl}" target="_blank" rel="noopener">Yard Material Tools</a></footer>` : ""}
      </section>
    `;

    const form = shadow.querySelector("form");
    const materialInput = shadow.querySelector('[name="material"]');
    const areaInput = shadow.querySelector('[name="area"]');
    const depthInput = shadow.querySelector('[name="depth"]');
    const volumeOutput = shadow.querySelector('[name="volume"]');
    const weightOutput = shadow.querySelector('[name="weight"]');
    const numberFormat = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const update = () => {
      try {
        const estimate = estimateMaterial({
          material: materialInput.value,
          area: areaInput.value,
          depth: depthInput.value,
          unit,
        });
        volumeOutput.textContent =
          unit === "metric"
            ? `${numberFormat.format(estimate.cubicMeters)} m\u00B3`
            : `${numberFormat.format(estimate.cubicYards)} yd\u00B3`;
        weightOutput.textContent =
          unit === "metric"
            ? `${numberFormat.format(estimate.minimumTonnes)}\u2013${numberFormat.format(estimate.maximumTonnes)} tonnes`
            : `${numberFormat.format(estimate.minimumTons)}\u2013${numberFormat.format(estimate.maximumTons)} tons`;
      } catch {
        volumeOutput.textContent = "Enter valid values";
        weightOutput.textContent = "-";
      }
    };

    form.addEventListener("input", update);
    form.addEventListener("change", update);
    update();
  }
}

if (globalThis.customElements && !globalThis.customElements.get(TAG_NAME)) {
  globalThis.customElements.define(TAG_NAME, YardMaterialCoverageElement);
}
