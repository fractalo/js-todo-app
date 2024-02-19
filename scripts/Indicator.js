import { CLASSNAMES } from "./constants.js";

export class Indicator {
    constructor(element) {
        this._element = element;
    }

    indicate(durationMs) {
        window.clearTimeout(this._timeout);
        this._element.classList.add(CLASSNAMES.INDICATOR_ACTIVE);
        this._timeout = window.setTimeout(() => {
            this._element.classList.remove(CLASSNAMES.INDICATOR_ACTIVE);
        }, durationMs);
    }
}