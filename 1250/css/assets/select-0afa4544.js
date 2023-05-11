import"./theme-f5abe173.js";import"./placeholder-6859ff6a.js";import"./status-success-82f14d39.js";import"./status-error-c946ba7b.js";import"./caret-down-small-27a5ce69.js";import"./close-small-b1641a9d.js";class i extends HTMLElement{constructor(){super()}connectedCallback(){const t=this.getAttribute("value"),e=this.hasAttribute("dismissible"),s=`
    <span
      class="iui-select-tag"
    >
      <span
        class="iui-select-tag-label"
        title="${t}"
      >
        ${t}
      </span>
      ${e?`<button class="iui-select-tag-button" aria-label="Delete ${t} tag" type="button">
            <svg-close-small class="iui-select-tag-button-icon" aria-hidden="true"></svg-close-small>
          </button>`:""}
    </span>
    `;this.parentElement.insertAdjacentHTML("beforeend",s),this.remove()}}customElements.define("multi-select-tag",i);
