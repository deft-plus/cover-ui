import { LitElement, customElement, html, TemplateResult, property } from 'lit-element';
import 'boxicons';

type iconType = 'regular' | 'solid' | 'logo';
type iconRotate = '90' | '180' | '270';
type iconFlip = 'horizontal' | 'vertical';
type iconBorder = 'square' | 'circle';
type iconPull = 'left' | 'right';
type iconFade = 'fade-left' | 'fade-right' | 'fade-up' | 'fade-down';
type iconAnimation = 'spin' | 'tada' | 'flashing' | 'burst' | iconFade;
type iconFadeHover = 'fade-left-hover' | 'fade-right-hover' | 'fade-up-hover' | 'fade-down-hover';
type iconAnimationHover = 'spin-hover' | 'tada-hover' | 'flashing-hover' | 'burst-hover' | iconFadeHover;

@customElement('cwc-icon')
export class Icon extends LitElement {

  @property({ type: String }) name = '';
  @property({ type: String }) type: iconType = 'regular';
  @property({ type: String }) color = '';
  @property({ type: String }) size = '';
  @property({ type: String }) rotate: '' | iconRotate = '';
  @property({ type: String }) flip: '' | iconFlip = '';
  @property({ type: String }) border: '' | iconBorder = '';
  @property({ type: String }) animation: '' | iconAnimation | iconAnimationHover = '';
  @property({ type: String }) pull: '' | iconPull = '';

  public render(): TemplateResult {
    return html`
      <box-icon
        name="${this.name}"
        type="${this.type }"
        color="${this.color}"
        size="${this.size}"
        rotate="${this.rotate}"
        flip="${this.flip}"
        border="${this.border}"
        animation="${this.animation}"
        pull = "${this.pull}"
      ></box-icon>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'cwc-icon': Icon;
  }
}
