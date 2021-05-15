import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { getCommonComponentsStylesheet } from '../../utils';

@customElement('my-element')
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
      ${getCommonComponentsStylesheet()}
      <div>
        <p class="btn-blue">A paragraph</p>
      </div>
    `;
    }
}
