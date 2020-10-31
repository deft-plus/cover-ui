import { LitElement, customElement, html, TemplateResult } from 'lit-element';
import { style } from './styles-css';

@customElement('cwc-button')
export class Button extends LitElement {
  static styles = style;

  public render(): TemplateResult {
    return html`
      <button>Hola, esto es un test!</button>
    `;
  }
}
