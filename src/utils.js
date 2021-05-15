import { html } from 'lit';

export function getVendorStylesheet() {
    return cloneStylesheetNodeEndsWith('/vendor.css');
}

export function getCommonComponentsStylesheet() {
    return cloneStylesheetNodeEndsWith('/baseComponents.css');
}

export function getIconsStylesheetCdn() {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    const fontawesomeRefs = [];
    for (const stylesheet of stylesheets) {
        if (stylesheet.href.includes('/font-awesome/')) {
            fontawesomeRefs.push(stylesheet.cloneNode());
        }
    }

    return fontawesomeRefs;
}

export function getFlagsStylesheetCdn() {
    return html`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css" integrity="sha512-Cv93isQdFwaKBV+Z4X8kaVBYWHST58Xb/jVOcV9aRsGSArZsgAnFIhMpDoMDcFNoUtday1hdjn0nGp3+KZyyFw==" crossorigin="anonymous" />`;
}

export function mapLanguageFlag(language) {
    if (language === 'en') {
        return 'gb';
    }
    return language;
}

function cloneStylesheetNodeEndsWith(searchTerm) {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    for (const stylesheet of stylesheets) {
        if (stylesheet.href.endsWith(searchTerm)) {
            return stylesheet.cloneNode();
        }
    }
}
