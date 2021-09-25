import { default as hljs } from 'highlight.js/lib/core';
import { GenerateModal } from "./GenerateModal";
import { LanguageDef } from './LanguageDef';
import { Toast } from 'bootstrap';
import throttle from './utils/throttle';
import { logFileUpload } from './utils/analytics';

enum LocalStorageKeys {
    Theme = 'theme',
    Language = 'language',
    Code = 'code',
}

export class App {
    container: HTMLElement;
    generateCodeButton: HTMLButtonElement;
    generateModal: GenerateModal;

    codeInput: HTMLTextAreaElement;
    codePreview: HTMLElement;

    fileUpload: HTMLInputElement;
    fileUploadButton: HTMLLinkElement;

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
        this.codeInput.addEventListener('input', this.handleCodeChange.bind(this));

        this.codePreview = container.querySelector('.code-preview');

        this.fileUpload = container.querySelector('input[type=file]');
        this.fileUploadButton = container.querySelector('.file-upload');
        this.fileUploadButton.addEventListener('click', () => this.fileUpload.click());
        this.fileUpload.addEventListener('change', this.handleFileChange.bind(this));

        this.languageInput = container.querySelector('.language-input');
        this.languageInput.addEventListener('change', this.handleLanguageChange.bind(this));

        this.themeInput = container.querySelector('.theme-input');
        this.themeInput.addEventListener('change', this.handleThemeChange.bind(this));

        this.languageStyleLink = document.getElementById('language-style') as HTMLLinkElement;

        this.copiedToClipboardToast = document.querySelector('.copied-to-clipboard-toast');

        this.generateModal = new GenerateModal(this);
    }

    configureLanguages(languages: LanguageDef[]) {
        languages.forEach(lang => {
            hljs.registerLanguage(lang.name, lang.import);

            this.languageInput.insertAdjacentHTML('beforeend', `<option value="${lang.name}">${lang.label}</option>`);
        });
        const language = localStorage.getItem(LocalStorageKeys.Language) || 'html';
        this.languageInput.value = language;
        if (language !== 'html') {
            this.handleLanguageChange();
        }

        const code = localStorage.getItem(LocalStorageKeys.Code);
        if (code !== null) {
            this.codeInput.value = code;
            this.handleCodeChange();
        }
    }

    configureThemes(themes: string[]) {
        themes.forEach(theme => {
            this.themeInput.insertAdjacentHTML('beforeend', `<option value="${theme}">${theme}</option>`);
        });
        const theme = localStorage.getItem(LocalStorageKeys.Theme) || 'default';
        this.themeInput.value = theme;
        if (theme !== 'default') {
            this.handleThemeChange();
        }
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

    private handleFileChange() {
        if (this.fileUpload.files.length === 0) {
            return;
        }

        const reader = new FileReader();
        reader.readAsText(this.fileUpload.files[0]);
        reader.addEventListener('load', (event: Event) => {
            this.codeInput.value = reader.result.toString();
            this.updatePreview();
            this.persistInputData(LocalStorageKeys.Code);
            logFileUpload(this.codeInput.value.length);
        });

        this.fileUpload.value = '';
    }

    private handleGenerateCode() {
        this.generateModal.show();
    }

    private handleLanguageChange() {
        this.updatePreview();
        this.persistInputData(LocalStorageKeys.Language);
    }

    private handleThemeChange() {
        this.languageStyleLink.href = `/codestyles/${this.themeInput.value}.css`;
        this.persistInputData(LocalStorageKeys.Theme);
    }

    private handleCodeChange() {
        this.updatePreview();
        this.persistInputData(LocalStorageKeys.Code);
    }

    private persistInputData(type: LocalStorageKeys) {
        const throttledUpdate = throttle(() => {
            if (type === LocalStorageKeys.Theme) {
                localStorage.setItem('theme', this.themeInput.value);
            }
            if (type === LocalStorageKeys.Language) {
                localStorage.setItem('language', this.languageInput.value);
            }
            if (type === LocalStorageKeys.Code) {
                localStorage.setItem('code', this.codeInput.value);
            }
        }, 500);

        throttledUpdate();
    }
}