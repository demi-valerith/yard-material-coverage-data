const TAG_NAME = "yard-material-coverage";
const SOURCE_URL = "https://yardmaterialtools.com/material-coverage-chart";

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

export function estimateMaterial({ material, area, depth }) {
  const normalizedMaterial = typeof material === "string" ? material.trim().toLowerCase() : "";
  const density = MATERIALS.find((entry) => entry.name.toLowerCase() === normalizedMaterial);
  const squareFeet = Number(area);
  const depthInches = Number(depth);

  if (!density) throw new TypeError("material must match a supported material");
  if (!Number.isFinite(squareFeet) || squareFeet <= 0) {
    throw new TypeError("area must be a positive finite number");
  }
  if (!Number.isFinite(depthInches) || depthInches <= 0) {
    throw new TypeError("depth must be a positive finite number");
  }

  const cubicYards = (squareFeet * depthInches) / 324;
  return {
    cubicYards,
    minimumTons: cubicYards * density.minimum,
    maximumTons: cubicYards * density.maximum,
  };
}

const BaseElement = globalThis.HTMLElement ?? class {};

export class YardMaterialCoverageElement extends BaseElement {
  static observedAttributes = ["material", "area", "depth"];

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    if (this.isConnected) this.render();
  }

  render() {
    const material = this.getAttribute("material") || "Pea gravel";
    const selectedMaterial =
      MATERIALS.find((entry) => entry.name.toLowerCase() === material.trim().toLowerCase()) ?? MATERIALS[0];
    const area = Number(this.getAttribute("area")) > 0 ? Number(this.getAttribute("area")) : 500;
    const depth = Number(this.getAttribute("depth")) > 0 ? Number(this.getAttribute("depth")) : 3;
    const shadow = this.shadowRoot ?? this.attachShadow({ mode: "open" });

    shadow.innerHTML = `
      <style>
        :host {
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
        input:focus, select:focus { outline: 3px solid rgba(47, 111, 134, 0.28); outline-offset: 1px; }
        .measurements { display: grid; gap: 10px; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
        .result {
          background: #f3f0e8;
          border-left: 4px solid #ab4c29;
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
              ${MATERIALS.map(
                (entry) => `<option${entry.name === selectedMaterial.name ? " selected" : ""}>${entry.name}</option>`,
              ).join("")}
            </select>
          </label>
          <div class="measurements">
            <label>
              Area (sq ft)
              <input name="area" type="number" min="1" step="1" inputmode="decimal" value="${area}">
            </label>
            <label>
              Depth (in)
              <input name="depth" type="number" min="0.25" step="0.25" inputmode="decimal" value="${depth}">
            </label>
          </div>
          <div class="result" aria-live="polite">
            <div class="result-row">
              <span class="result-label">Material volume</span>
              <output name="yards"></output>
            </div>
            <div class="result-row">
              <span class="result-label">Typical weight</span>
              <output name="tons"></output>
            </div>
          </div>
          <p class="note">Planning estimate only. Moisture, compaction, gradation, and supplier measurements vary.</p>
        </form>
        <footer>Source: <a href="${SOURCE_URL}" target="_blank" rel="noopener">Yard Material Tools</a></footer>
      </section>
    `;

    const form = shadow.querySelector("form");
    const materialInput = shadow.querySelector('[name="material"]');
    const areaInput = shadow.querySelector('[name="area"]');
    const depthInput = shadow.querySelector('[name="depth"]');
    const yardsOutput = shadow.querySelector('[name="yards"]');
    const tonsOutput = shadow.querySelector('[name="tons"]');
    const numberFormat = new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    const update = () => {
      try {
        const estimate = estimateMaterial({
          material: materialInput.value,
          area: areaInput.value,
          depth: depthInput.value,
        });
        yardsOutput.textContent = `${numberFormat.format(estimate.cubicYards)} yd\u00B3`;
        tonsOutput.textContent = `${numberFormat.format(estimate.minimumTons)}\u2013${numberFormat.format(estimate.maximumTons)} tons`;
      } catch {
        yardsOutput.textContent = "Enter valid values";
        tonsOutput.textContent = "-";
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
