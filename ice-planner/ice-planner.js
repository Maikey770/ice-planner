/**
 * Copyright 2025 Maikey770
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./cost-display.js";

/**
 * `ice-planner`
 * Main application component for calculating ice time costs.
 *
 * @demo index.html
 * @element ice-planner
 */
export class IcePlanner extends DDDSuper(I18NMixin(LitElement)) {
  // Define tag name
  static get tag() {
    return "ice-planner";
  }

  // Constructor: initialize default values
  constructor() {
    super();
    this.title = "Ice Planner";
    this.teamName = "My Team";
    this.iceCost = 300;
    this.slots = 50;
    this.fee = 0.02;
    this.coaches = 3000;
    this.jerseys = 88;
    this.players = 1;
    this.total = 0;
    this.perPlayer = 0;
    this._recalc(); // calculate once on load
  }

  // Declare reactive properties
  static get properties() {
    return {
      ...super.properties,
      teamName: { type: String },
      iceCost: { type: Number },
      slots: { type: Number },
      fee: { type: Number },
      coaches: { type: Number },
      jerseys: { type: Number },
      players: { type: Number },
      total: { type: Number },
      perPlayer: { type: Number },
    };
  }

  // Component styles (using DDD Design System)
  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-coalyGray);
          font-family: var(--ddd-font-navigation);
          border-radius: var(--ddd-radius-md);
          padding: var(--ddd-spacing-4);
        }
        .wrapper {
          max-width: 800px;
          margin: 0 auto;
          text-align: left;
        }
        h3 {
          text-align: center;
          color: var(--ddd-theme-primary);
        }
        .inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ddd-spacing-3);
          margin-top: var(--ddd-spacing-3);
        }
        label {
          display: flex;
          flex-direction: column;
          font-size: var(--ddd-font-size-s);
        }
        input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 8px;
          margin-top: 4px;
        }
      `,
    ];
  }

  // Recalculate total and per-player cost
  _recalc() {
    const ice = this.iceCost * this.slots; // total ice cost
    const base = ice + this.coaches + this.jerseys * this.players; // base cost
    const fee = base * this.fee; // additional fee
    this.total = base + fee; // total with fee
    this.perPlayer = this.players > 0 ? this.total / this.players : 0; // cost per player
    this.requestUpdate(); // re-render component
  }

  // Render UI for inputs and results
  render() {
    return html`
      <div class="wrapper">
        <!-- Team name input -->
        <label>
          Team Name
          <input
            type="text"
            .value=${this.teamName}
            @input=${(e) => (this.teamName = e.target.value)}
          />
        </label>

        <!-- Input fields for cost and settings -->
        <div class="inputs">
          <label>
            Ice Cost ($/hour)
            <input
              type="number"
              value=${this.iceCost}
              @input=${(e) => {
                this.iceCost = Number(e.target.value);
                this._recalc();
              }}
            />
          </label>

          <label>
            Slots (hours)
            <input
              type="number"
              value=${this.slots}
              @input=${(e) => {
                this.slots = Number(e.target.value);
                this._recalc();
              }}
            />
          </label>

          <label>
            Fee Rate (%)
            <input
              type="number"
              value=${this.fee * 100}
              @input=${(e) => {
                this.fee = Number(e.target.value) / 100;
                this._recalc();
              }}
            />
          </label>

          <label>
            Coaches ($)
            <input
              type="number"
              value=${this.coaches}
              @input=${(e) => {
                this.coaches = Number(e.target.value);
                this._recalc();
              }}
            />
          </label>

          <label>
            Jerseys ($/player)
            <input
              type="number"
              value=${this.jerseys}
              @input=${(e) => {
                this.jerseys = Number(e.target.value);
                this._recalc();
              }}
            />
          </label>

          <label>
            Players
            <input
              type="number"
              value=${this.players}
              min="1"
              @input=${(e) => {
                this.players = Number(e.target.value);
                this._recalc();
              }}
            />
          </label>
        </div>

        <!-- Display total and per-player cost using custom web component -->
        <cost-display 
          .total="${this.total}" 
          .perPlayer="${this.perPlayer}">
        </cost-display>
      </div>
    `;
  }

  // HAX properties file reference
  static get haxProperties() {
    return new URL(
      `./lib/${this.tag}.haxProperties.json`,
      import.meta.url
    ).href;
  }
}

// Register custom element
globalThis.customElements.define(IcePlanner.tag, IcePlanner);
