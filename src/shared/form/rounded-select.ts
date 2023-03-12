import { SelectBase } from "@material/mwc-select/mwc-select-base";
import { styles } from "@material/mwc-select/mwc-select.css";
import { css, html, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import { debounce, nextRender } from "../../ha";

@customElement("rounded-select")
export class RoundedSelect extends SelectBase {
    // @ts-ignore
    @property({ type: Boolean }) public icon?: boolean;

    protected override renderLeadingIcon() {
        if (!this.icon) {
            return nothing;
        }

        return html`<span class="mdc-select__icon"><slot name="icon"></slot></span>`;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener("translations-updated", this._translationsUpdated);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        window.removeEventListener("translations-updated", this._translationsUpdated);
    }

    private _translationsUpdated = debounce(async () => {
        await nextRender();
        this.layoutOptions();
    }, 500);

    static override styles = [
        styles,
        css`
            .mdc-select__anchor {
                height: var(--select-height, 56px) !important;
            }
        `,
    ];
}

declare global {
    interface HTMLElementTagNameMap {
        "rounded-select": RoundedSelect;
    }
}
