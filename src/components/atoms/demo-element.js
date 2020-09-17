import { LitElement, html } from 'lit-element';

export class DemoElement extends LitElement {
    // Implement `render` to define a template for your element.
    render() {
        /**
         * Return a lit-html `TemplateResult`.
         *
         * To create a `TemplateResult`, tag a JavaScript template literal
         * with the `html` helper function.
         */
        return html`
      <div>
        <p>A paragraph</p>
      </div>
    `;
    }
}
window.customElements.define('my-element', DemoElement);
