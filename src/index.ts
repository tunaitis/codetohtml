import { default as hljs } from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
import javascript from 'highlight.js/lib/languages/javascript';

import * as bootstrap from 'bootstrap';

/*
import prettier from 'prettier/standalone';
// @ts-ignore
import parserBabel from 'prettier/parser-babel';
// @ts-ignore
import parserHtml from 'prettier/parser-html';
*/

hljs.registerLanguage('xml', xml);
hljs.registerLanguage('javascript', javascript);

import './styles/main.scss';

const codeInput = document.querySelector('#code') as HTMLTextAreaElement;
const generatedCodeInput = document.querySelector('#generatedCode') as HTMLTextAreaElement;
const preview = document.querySelector('#preview') as HTMLElement;
const languageInput = document.querySelector('#languages') as HTMLInputElement;
const themeInput = document.querySelector('#themes') as HTMLInputElement;
const languageStyleLink = document.querySelector('#language-style') as HTMLLinkElement;
const generateButton = document.querySelector('#generate');
const generateModal = document.querySelector('#generateModal');

const languages = ['html', 'javascript', 'xml'];
const themes = ['default', 'github', 'github-dark', 'github-dark-dimmed', 'monokai', 'rainbow'];

class GenerateModal {
    container: HTMLElement;
    copyCodeToClipboard: HTMLButtonElement;
    downloadCode: HTMLButtonElement;

    modal: bootstrap.Modal;

    constructor(app: App) {
        this.initialize(app.container);
    }

    initialize(container: HTMLElement) {
        this.container = container.querySelector('#generateModal');
        this.modal = new bootstrap.Modal(this.container, {});

        this.copyCodeToClipboard = this.container.querySelector('.btn-copy-to-clipboard');
        this.copyCodeToClipboard.addEventListener('click', this.handleCopyCodeToClipboard.bind(this));

        this.downloadCode = this.container.querySelector('.btn-download');
        this.downloadCode.addEventListener('click', this.handleDownloadCode.bind(this));
    }

    handleCopyCodeToClipboard() {
        this.modal.hide();
    }

    handleDownloadCode() {
        this.modal.hide();
    }

    show() {
        this.modal.show();
    }
}

class App {
    container: HTMLElement;
    generateCodeButton: HTMLButtonElement;
    generateModal: GenerateModal;

    codeInput: HTMLTextAreaElement;
    codePreview: HTMLElement;

    languageInput: HTMLSelectElement;

    constructor(container: HTMLElement) {
        this.initialize(container);
    }

    initialize(container: HTMLElement) {
        this.container = container;

        this.generateCodeButton = container.querySelector('#generate');
        this.generateCodeButton.addEventListener('click', this.handleGenerateCode.bind(this));

        this.codeInput = container.querySelector('.code-input');
        this.codeInput.addEventListener('input', () => this.updatePreview());

        this.codePreview = container.querySelector('.code-preview');

        this.languageInput = container.querySelector('.language-input');
        this.languageInput.addEventListener('change', () => this.updatePreview());

        this.generateModal = new GenerateModal(this);

        this.initiliazeLanguages();
    }

    initiliazeLanguages() {

    }

    handleGenerateCode() {
        this.generateModal.show();
    }

    updatePreview() {
        const output = hljs.highlight(this.codeInput.value, { language: this.languageInput.value });

        this.codePreview.innerHTML = output.value;
        this.codePreview.style.maxHeight = `${this.codeInput.offsetHeight}px`;
    }
}

const app = new App(document.querySelector('main'));
app.updatePreview();

/*
languages.forEach((langName) => {
    const langModule = require(`highlight.js/lib/languages/${langName}`);
    hljs.registerLanguage(langName, langModule);
});*/

/*
const updatePreview = () => {

    //hljs.configure({ cssSelector: 'code' });

    const code = formatCodeInput.checked
        ? prettier.format(codeInput.value, { parser: 'html', plugins: [parserBabel, parserHtml] })
        : codeInput.value;
const code = codeInput.value;


const output = hljs.highlight(code, { language: languageInput.value });

preview.innerHTML = output.value;
preview.style.maxHeight = `${codeInput.offsetHeight}px`;
    //generatedCodeInput.value = output.value;
};*/

generateButton.addEventListener('click', (event) => {
    //var modal = new bootstrap.Modal(generateModal, {});
    //modal.show();
});

themeInput.addEventListener('change', (event) => {
    languageStyleLink.href = `/lib/styles/${themeInput.value}.css`;
});

languageInput.addEventListener('change', (event) => {
    //updatePreview();
});

languages.forEach(lang => {
    languageInput.insertAdjacentHTML('beforeend', `<option value="${lang}">${lang}</option>`);
})
languageInput.value = 'html';

themes.forEach(theme => {
    themeInput.insertAdjacentHTML('beforeend', `<option value="${theme}">${theme}</option>`);
});


//updatePreview();