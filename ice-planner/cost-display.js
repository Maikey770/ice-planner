import { LitElement, html, css } from "lit";
import "@haxtheweb/d-d-d/d-d-d.js";

/**
 * cost-display
 * Small component that shows the total and cost per player.
 */
export class CostDisplay extends LitElement {
  // Component tag name
  static get tag() {
    return "cost-display";
  }

  // Properties passed from the main app
  static get properties() {
    return {
      total: { type: Number },
      perPlayer: { type: Number },
    };
  }

  // Set default values
  constructor() {
    super();
    this.total = 0;
    this.perPlayer = 0;
  }

  // Basic styling using DDD variables
  static get styles() {
    return css`
      :host {
        display: block;
        padding: var(--ddd-spacing-4);
        margin-top: var(--ddd-spacing-4);
        border-radius: var(--ddd-radius-md);
        background-color: var(--ddd-theme-default-snow);
        color: var(--ddd-theme-default-coalyGray);
        box-shadow: var(--ddd-theme-elevation-3);
        text-align: center;
        font-family: var(--ddd-font-navigation);
        transition: background-color 0.3s, color 0.3s;
      }

      :host([dark]) {
        background-color: var(--ddd-theme-default-coalyGray);
        color: var(--ddd-theme-default-white);
      }

      h3 {
        color: var(--ddd-theme-primary);
        margin-bottom: var(--ddd-spacing-2);
        font-size: 1.3rem;
      }

      p {
        margin: var(--ddd-spacing-1) 0;
        font-size: 1.1rem;
        font-weight: bold;
      }

      .highlight {
        font-size: 1.2rem;
        color: var(--ddd-theme-accent);
      }
    `;
  }

  // Render the total and per-player cost
  render() {
    return html`
      <h3>Team Cost Summary</h3>
      <p>Total Cost:</p>
      <p class="highlight">$${this.total.toFixed(2)}</p>
      <p>Per Player:</p>
      <p class="highlight">$${this.perPlayer.toFixed(2)}</p>
    `;
  }
}

// Define the custom element
customElements.define(CostDisplay.tag, CostDisplay);
