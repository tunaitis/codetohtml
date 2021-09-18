import { default as hljs } from 'highlight.js/lib/core';
import { GenerateModal } from "./GenerateModal";
import { LanguageDef } from './LanguageDef';
import { Toast } from 'bootstrap';

export class App {
    container: HTMLElement;
    generateCodeButton: HTMLButtonElement;
    generateModal: GenerateModal;

    codeInput: HTMLTextAreaElement;
    codePreview: HTMLElement;

    languageInput: HTMLSelectElement;
    themeInput: HTMLSelectElement;

    languageStyleLink: HTMLLinkElement;

    copiedToClipboardToast: HTMLElement;

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

        this.themeInput = container.querySelector('.theme-input');
        this.themeInput.addEventListener('change', this.handleThemeChange.bind(this));

        this.languageStyleLink = document.getElementById('language-style') as HTMLLinkElement;

        this.copiedToClipboardToast = document.querySelector('.copied-to-clipboard-toast');

        this.generateModal = new GenerateModal(this);
    }

    configureLanguages(languages: LanguageDef[]) {
        languages.forEach(lang => {
            hljs.registerLanguage(lang.name, lang.import);

            this.languageInput.insertAdjacentHTML('beforeend', `<option value="${lang.name}">${lang.name}</option>`);
        });
        this.languageInput.value = 'html';
    }

    configureThemes(themes: string[]) {
        themes.forEach(theme => {
            this.themeInput.insertAdjacentHTML('beforeend', `<option value="${theme}">${theme}</option>`);
        });
    }

    updatePreview() {
        const output = hljs.highlight(this.codeInput.value, { language: this.languageInput.value });
        this.codePreview.firstElementChild.innerHTML = output.value;
        this.codePreview.firstElementChild.setAttribute('style', `max-height: ${this.codeInput.offsetHeight}px;`);
    }

    private generateCode() {

        const styleSheet = document.styleSheets[0] as CSSStyleSheet;

        var proto: any = Element.prototype;
        var matches = Function.call.bind(proto.matchesSelector ||
            proto.mozMatchesSelector || proto.webkitMatchesSelector ||
            proto.msMatchesSelector || proto.oMatchesSelector);

        const traverseAndSetStyle = (item: Node) => {
            Array.from(item.childNodes).forEach(node => {
                if (node.nodeType == Node.ELEMENT_NODE && node.hasChildNodes) {
                    const element = node as HTMLElement;
                    let elementStyle: string[] = [];
                    Array.from(styleSheet.rules).forEach((rule: CSSStyleRule) => {
                        if (matches(element, rule.selectorText)) {
                            let ruleStyle = rule.cssText.replace(`${rule.selectorText}`, '');
                            ruleStyle = ruleStyle.slice(3, ruleStyle.length - 2);
                            elementStyle.push(ruleStyle);
                        }
                    });
                    element.setAttribute('style', elementStyle.join(' '));
                    traverseAndSetStyle(node);
                    element.removeAttribute('class');
                }
            });
        };

        const codeNodes = this.codePreview.cloneNode(true);
        traverseAndSetStyle(codeNodes);

        const div = document.createElement('div');
        div.appendChild(codeNodes);

        return div.firstElementChild.innerHTML;
    }

    copyToClipboard() {
        const code = this.generateCode();
        navigator.clipboard.writeText(code).then(() => {
            const toast = new Toast(this.copiedToClipboardToast, { autohide: true, delay: 1500 });
            toast.show();
        }, function (err) {
        });
    }

    download() {
        const code = this.generateCode();

        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(code));
        element.setAttribute('download', 'code.html');

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    private handleGenerateCode() {
        this.generateModal.show();
    }

    private handleThemeChange() {
        this.languageStyleLink.href = `/codestyles/${this.themeInput.value}.css`;
    }
}