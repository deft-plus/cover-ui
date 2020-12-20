import { LitElement, customElement, html, TemplateResult, property } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import { style } from './styles-css';
import '@cover-ui/cwc-icon';

@customElement('cwc-button')
export class Button extends LitElement {

  /** Button outlined and a background color transparent. */
  @property({ type: Boolean, reflect: true }) lined = false;
  /** Button filled with a background color. */
  @property({ type: Boolean, reflect: true }) solid = false;

  /** Disabled property for the button. */
  @property({ type: Boolean, reflect: true }) disabled = false;
  /** Round button property for the button. */
  @property({ type: Boolean, reflect: true }) round = false;

  /** Alignment for the label in the button. 'left' | 'right' | 'center' */
  @property({ type: String, attribute: 'label-align' }) labelAlign: 'left' | 'right' | 'center' = 'center';
  /** Label to display in the button. */
  @property({ type: String }) label = '';

  /** Alignment for the leading icon in the button. 'start' | 'end' */
  @property({ type: String, attribute: 'lead-icon-align' }) leadIconAlign: 'start' | 'end' = 'end';
  /** Leading icon to display in the button. */
  @property({ type: String, attribute: 'lead-icon' }) leadIcon = '';

  /** Alignment for the trailing icon in the button. 'start' | 'end' */
  @property({ type: String, attribute: 'trail-icon-align' }) trailIconAlign: 'start' | 'end' = 'start';
  /** Trailing icon to display in the button. */
  @property({ type: String, attribute: 'trail-icon' }) trailIcon = '';

  /**
   * Property to display the buttons as a standard or icon button.
   * To set the button as an icon button the following rules need to apply:
   * 
   *  - Have a lead icon set.
   *  - Not have a trail icon set.
   *  - Not have a label set.
   * 
   * Any other configuration will return a standard button.
   */
  private get isIconButton(): boolean {
    const hasLeadIcon = this.leadIcon !== '';
    const hasTrailIcon = this.trailIcon !== '';
    const hasLabel = this.label !== '';
    return hasLeadIcon && !hasTrailIcon && !hasLabel;
  }

  /**
   * Property renders the classes to be apply in the button
   * depending on the properties.
   */
  private get renderClasses() {
    return classMap({
      'lined': this.lined,
      'solid': this.solid,
      'icon': this.isIconButton
    });
  }

  static styles = style;

  public render(): TemplateResult {
    return html`
      <button
        id="button"
        class="button ${this.renderClasses}"
        ?disabled="${this.disabled}"
        aria-label="${this.label || this.leadIcon}"
      >
        ${this.leadIcon ? this.renderLeadIcon() : ''}
        ${this.label}
        ${this.trailIcon ? html`<box-icon name="${this.trailIcon}"></box-icon>` : ''}
      </button>
    `;
  }

  private renderLeadIcon(): TemplateResult {
    return html`
      <cwc-icon
        name="${this.leadIcon}"
      ></cwc-icon>
    `;
  }
}
