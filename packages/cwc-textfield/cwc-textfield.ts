import { LitElement, customElement, html, TemplateResult } from 'lit-element';
import { style } from './styles-css';

@customElement('cwc-textfield')
export class Textfield extends LitElement {
  static styles = style;

  public render(): TemplateResult {
    return html`
      <input placeholder="hello biatch!" />
    `;
  }
}
